"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { isProtectedRoute } from "@/utils/routeGuard.util";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

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
  const pathname = usePathname();
  const router = useRouter();

  const { open, reason, setOpen } = useLoginModalStore();

  const cancelGoHome = isProtectedRoute(pathname);

  const goHomeAndClose = () => {
    void router.replace("/");
    setOpen(false);
  };

  const closeOnly = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => {
        if (cancelGoHome && nextOpen === false) return;
        setOpen(nextOpen);
      }}
    >
      <DialogContent
        className="h-[216px] max-w-[342px] gap-0 rounded-3xl p-6"
        showCloseButton={false}
        onPointerDownOutside={e => {
          if (cancelGoHome) e.preventDefault();
        }}
        onEscapeKeyDown={e => {
          if (cancelGoHome) e.preventDefault();
        }}
        onInteractOutside={e => {
          if (cancelGoHome) e.preventDefault();
        }}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={cancelGoHome ? goHomeAndClose : closeOnly}
          className="absolute top-6 right-6 rounded-full p-1"
        >
          <Image src="/icons/delete.svg" alt="닫기 버튼" width={24} height={24} />
        </button>
        <DialogHeader className="flex h-[120px] flex-col items-center justify-center">
          <DialogTitle className="text-lg font-semibold text-gray-700">
            {reason === "INVALID_TOKEN"
              ? "세션이 만료되었습니다. 다시 로그인해주세요."
              : "로그인이 필요한 서비스입니다."}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex h-12 flex-row gap-2">
          <Button
            variant="outline"
            onClick={cancelGoHome ? goHomeAndClose : closeOnly}
            className="h-full flex-1 rounded-[12px] border border-gray-100 text-base font-medium text-gray-500 shadow-none hover:cursor-pointer hover:bg-transparent hover:shadow-sm"
          >
            취소
          </Button>
          <Suspense fallback={null}>
            <LoginButton />
          </Suspense>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationJoinModal;
