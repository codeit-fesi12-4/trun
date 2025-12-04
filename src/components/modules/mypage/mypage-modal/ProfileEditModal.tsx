import ModalLayout from "@/components/layouts/ModalLayout";
import { MypageField } from "./MypageField";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProfileEditModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <ModalLayout
    open={open}
    onOpenChange={onOpenChange}
    title="프로필 수정하기"
    onConfirm={() => alert("수정하기 버튼 클릭")}
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
        />
        <MypageField
          id="signup-company"
          label="회사"
          placeholder="회사명을 입력해주세요."
          autoComplete="organization"
        />
        <MypageField
          id="signup-email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
        />
      </form>
    </div>
  </ModalLayout>
);

export default ProfileEditModal;
