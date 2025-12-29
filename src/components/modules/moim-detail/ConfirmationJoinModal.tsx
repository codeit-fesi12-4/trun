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
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { useLoginModalStore } from "@/stores/loginModal.store";
import Image from "next/image";
import { Suspense } from "react";

// useSearchParams()를 사용하는 부분만 별도 컴포넌트로 분리
const LoginButton = () => {
  const { redirectToLogin } = useLoginRedirect();
  const { setOpen } = useLoginModalStore();

  const handleApproveButtonClick = () => {
    setOpen(false);
    redirectToLogin();
  };

  return (
    <Button
      onClick={handleApproveButtonClick}
      className="h-full flex-1 rounded-[12px] bg-green-500 text-base font-bold hover:cursor-pointer hover:bg-green-500 hover:shadow-md"
    >
      확인
    </Button>
  );
};

const ConfirmationJoinModal = () => {
  const { open, reason, setOpen } = useLoginModalStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="h-[216px] max-w-[342px] gap-0 rounded-3xl p-6"
        showCloseButton={false}
      >
        <DialogClose asChild className="absolute top-6 right-6 rounded-full p-1">
          <button type="button" aria-label="닫기">
            <Image src="/icons/delete.svg" alt="닫기 버튼" width={24} height={24} />
          </button>
        </DialogClose>
        <DialogHeader className="flex h-[120px] flex-col items-center justify-center">
          <DialogTitle className="text-lg font-semibold text-gray-700">
            {reason === "INVALID_TOKEN"
              ? "세션이 만료되었습니다. 다시 로그인해주세요."
              : "로그인이 필요한 서비스입니다."}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex h-12 flex-row gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-full flex-1 rounded-[12px] border border-gray-100 text-base font-medium text-gray-500 shadow-none hover:cursor-pointer hover:bg-transparent hover:shadow-sm"
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
};

export default ConfirmationJoinModal;
