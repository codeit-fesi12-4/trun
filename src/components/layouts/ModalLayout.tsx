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
}

const ModalLayout = ({
  open,
  onOpenChange,
  title,
  children,
  onConfirm,
  confirmText = "확인",
}: IModalLayoutProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-sm p-6 sm:max-w-md md:max-w-lg [&>button[data-slot='dialog-close']]:top-5.5 [&>button[data-slot='dialog-close']]:right-5 [&>button[data-slot='dialog-close']]:hover:bg-gray-100 [&>button[data-slot='dialog-close']]:focus:bg-gray-100 [&>button[data-slot='dialog-close']]:focus:ring-0 [&>button[data-slot='dialog-close']]:focus:ring-offset-0 [&>button[data-slot='dialog-close']]:sm:top-5 [&>button[data-slot='dialog-close']]:sm:right-6 [&>button[data-slot='dialog-close']>svg]:size-6">
      <DialogHeader className="text-left">
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button
          onClick={onConfirm}
          className="w-full border-transparent bg-gray-500 font-semibold text-white hover:bg-gray-600"
        >
          {confirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ModalLayout;
