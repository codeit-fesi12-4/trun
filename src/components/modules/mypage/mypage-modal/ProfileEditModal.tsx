import ModalLayout from "@/components/layouts/ModalLayout";
import { MypageField } from "./MypageField";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/auth.type";
import { UpdateProfileErrors, validateUpdateProfile } from "@/utils/validators.utils";

const ProfileEditModal = ({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
}) => {
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    image: "",
  });
  const [errors, setErrors] = useState<UpdateProfileErrors>({});

  useEffect(() => {
    if (!open || !user) return;
    setTimeout(() => {
      setForm({
        name: (user.name && user.name) || "",
        companyName: (user.companyName && user.companyName) || "",
        email: (user.email && user.email) || "",
        image: (user.image && user.image) || "",
      });
      setErrors({});
    }, 0);
  }, [open, user]);

  const handleChange =
    (field: "name" | "companyName" | "email") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setForm(prev => ({ ...prev, [field]: value }));

      // 해당 필드 에러 제거
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = () => {
    const nextErrors = validateUpdateProfile({
      name: form.name,
      email: form.email,
      companyName: form.companyName,
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    alert("유효성 검사 테스트");
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
          <Button className="hover:bg-0 h-28 w-28 cursor-pointer bg-transparent p-0 text-green-600">
            <Image src="/icons/ic_profile_edit.svg" alt="내정보" width={112} height={112} />
          </Button>
        </div>
        <form className="space-y-4 pb-4" noValidate>
          <MypageField
            id="signup-name"
            label="이름"
            placeholder="이름을 입력해주세요."
            autoComplete="name"
            value={form.name}
            onChange={handleChange("name")}
            error={errors.name}
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
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default ProfileEditModal;
