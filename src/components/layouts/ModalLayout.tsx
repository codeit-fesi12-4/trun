"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IModalLayoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  onPrevious?: () => void;
  previousText?: string;
  showPrevious?: boolean;
  onCancel?: () => void;
  cancelText?: string;
  showCancel?: boolean;
}

const ModalLayout = ({
  open,
  onOpenChange,
  title,
  children,
  onConfirm,
  confirmText = "확인",
  onPrevious,
  previousText = "이전",
  showPrevious = false,
  onCancel,
  cancelText = "취소",
  showCancel = false,
}: IModalLayoutProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      showCloseButton={false}
      className="max-w-sm rounded-4xl bg-white p-10 sm:max-w-md md:max-w-lg"
    >
      <DialogHeader className="text-left">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {children}

      <DialogFooter className="flex flex-row gap-2 sm:gap-3">
        {(showCancel && onCancel) || (showPrevious && onPrevious) ? (
          <>
            {showCancel && onCancel && (
              // 취소 버튼
              <Button
                onClick={onCancel}
                variant="outline"
                className="h-12 flex-1 rounded-xl border-gray-100 bg-white font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-600"
              >
                {cancelText}
              </Button>
            )}
            {showPrevious && onPrevious && (
              // 이전 버튼
              <Button
                onClick={onPrevious}
                variant="outline"
                className="h-12 flex-1 rounded-xl border-gray-100 bg-white font-semibold text-gray-500 hover:bg-gray-50"
              >
                {previousText}
              </Button>
            )}
            {/* 확인 버튼 */}
            <Button
              onClick={onConfirm}
              className="h-12 flex-1 rounded-xl border-transparent bg-green-500 font-semibold text-white hover:bg-green-600"
            >
              {confirmText}
            </Button>
          </>
        ) : (
          // 확인 버튼
          <Button
            onClick={onConfirm}
            className="h-12 w-full border-transparent bg-gray-500 font-semibold text-white hover:bg-gray-600"
          >
            {confirmText}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ModalLayout;
