import ModalLayout from "@/components/layouts/ModalLayout";
import { MypageField } from "./MypageField";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  UpdateProfileErrors,
  UpdateProfileForm,
  validateUpdateProfile,
} from "@/utils/validators.utils";
import { UserProfile } from "@/types/user.type";
import { useUpdateProfileMutationQuery } from "@/hooks/useUserQuery";
import { toast } from "sonner";

const ProfileEditModal = ({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
}) => {
  const [form, setForm] = useState<UpdateProfileForm>({
    companyName: "",
    image: "",
    file: null,
  });
  const [errors, setErrors] = useState<UpdateProfileErrors>({});

  // 모달 open 유저 정보가 바뀌면 폼 초기화
  useEffect(() => {
    if (!open || !user) return;
    setTimeout(() => {
      setForm({
        companyName: (user.companyName && user.companyName) || "",
        image: (user.image && user.image) || "",
        file: null,
      });
      setErrors({});
    }, 0);
  }, [open, user]);

  // input 변경 처리
  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));

    // 해당 필드 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validateUpdateProfile로 검사
    const tempForm: UpdateProfileForm = { companyName: form.companyName, file };
    const nextErrors = validateUpdateProfile(tempForm);

    if (nextErrors.image) {
      toast(nextErrors.image);
      return;
    }

    // 에러 없으면 상태 업데이트
    setForm(prev => ({
      ...prev,
      image: URL.createObjectURL(file),
      file,
    }));

    if (errors.image) {
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  // 회원정보 업데이트
  const updateProfileMutation = useUpdateProfileMutationQuery();
  const handleSubmit = () => {
    const nextErrors = validateUpdateProfile({
      companyName: form.companyName,
      file: form.file,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // FormData 생성
    const formData = new FormData();
    formData.append("companyName", form.companyName);
    if (form.file) formData.append("image", form.file);

    updateProfileMutation.mutate(
      { formData },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <ModalLayout
      open={open}
      onOpenChange={onOpenChange}
      title="프로필 수정하기"
      onConfirm={handleSubmit}
      confirmText="수정하기"
      onCancel={() => onOpenChange(false)}
      showCancel
    >
      {/* 폼 */}
      <div className="flex flex-col">
        <div className="flex justify-center pt-4 pb-8">
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image" className="cursor-pointer">
            <div className="relative h-28 w-28">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="프로필 이미지"
                  className="h-28 w-28 rounded-full object-cover"
                  width={112}
                  height={112}
                />
              ) : (
                <Image src="/icons/default_profile.svg" alt="내정보" width={112} height={112} />
              )}
              <Image
                src="/icons/ic_mypage_modal_edit.svg"
                alt="edit button"
                width={40}
                height={40}
                className="absolute right-0 bottom-0"
              />
            </div>
          </label>
        </div>
        <form className="space-y-4 pb-4" noValidate>
          <MypageField
            id="signup-name"
            label="이름"
            placeholder="이름을 입력해주세요."
            autoComplete="name"
            disabled
          />
          <MypageField
            id="signup-company"
            label="회사"
            placeholder="회사명을 입력해주세요."
            autoComplete="organization"
            value={form.companyName}
            onChange={handleChange("companyName")}
            error={errors.companyName}
          />
          <MypageField
            id="signup-email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            autoComplete="email"
            disabled
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default ProfileEditModal;
