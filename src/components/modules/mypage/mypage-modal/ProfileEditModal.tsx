import ModalLayout from "@/components/layouts/ModalLayout";
import { MypageField } from "./MypageField";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/auth.type";

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

  useEffect(() => {
    if (!open || !user) return;
    setTimeout(() => {
      setForm({
        name: (user.name && user.name) || "",
        companyName: (user.companyName && user.companyName) || "",
        email: (user.email && user.email) || "",
        image: (user.image && user.image) || "",
      });
    }, 0);
  }, [open, user]);

  return (
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
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <MypageField
            id="signup-company"
            label="회사"
            placeholder="회사명을 입력해주세요."
            autoComplete="organization"
            value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
          />
          <MypageField
            id="signup-email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            autoComplete="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default ProfileEditModal;
