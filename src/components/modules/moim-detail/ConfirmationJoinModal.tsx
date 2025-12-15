"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ConfirmationJoinModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

// useSearchParams()를 사용하는 부분만 별도 컴포넌트로 분리
const LoginButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLogin = () => {
    const current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    router.push(`/login?redirect=${encodeURIComponent(current)}`);
  };

  return (
    <Button
      onClick={handleLogin}
      className="h-full flex-1 rounded-[12px] bg-green-500 text-base font-bold sm:rounded-2xl sm:text-xl"
    >
      확인
    </Button>
  );
};

const ConfirmationJoinModal = ({ open, onOpenChange }: ConfirmationJoinModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="h-[216px] max-w-[342px] gap-0 rounded-3xl p-6 sm:h-[289px] sm:max-w-[600px] sm:rounded-[40px] sm:p-10"
      showCloseButton={false}
    >
      <DialogClose
        asChild
        className="absolute top-6 right-6 rounded-full p-1 sm:top-10 sm:right-10"
      >
        <button aria-label="닫기">
          <Image src="/icons/delete.svg" alt="닫기 버튼" width={24} height={24} />
        </button>
      </DialogClose>
      <DialogHeader className="flex h-[120px] flex-col items-center justify-center sm:h-[141px]">
        <DialogTitle className="text-lg font-semibold text-gray-700 sm:text-2xl">
          로그인이 필요한 서비스입니다.
        </DialogTitle>
      </DialogHeader>
      <DialogFooter className="flex h-12 flex-row gap-2 sm:h-15">
        <DialogClose asChild>
          <Button
            variant="outline"
            className="h-full flex-1 rounded-[12px] border border-gray-100 text-base font-medium text-gray-500 shadow-none sm:rounded-2xl sm:text-lg"
          >
            취소
          </Button>
        </DialogClose>
        {/* useSearchParams()를 사용하는 컴포넌트를 Suspense로 감싸야 함 */}
        <Suspense fallback={null}>
          <LoginButton />
        </Suspense>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ConfirmationJoinModal;
