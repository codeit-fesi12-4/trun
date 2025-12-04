"use client";

import { useMoimAddModal, TOTAL_STEPS } from "@/hooks/useMoimAddModal";
import ModalLayout from "@/components/layouts/ModalLayout";
import { MoimAddChapter } from "./moim-add-modal/MoimAddChapter";

type MoimAddModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MoimAddModal = ({ open, onOpenChange }: MoimAddModalProps) => {
  const {
    formData,
    currentStep,
    handleModalOpenChange,
    handleFieldChange,
    handleServiceChange,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useMoimAddModal({ onOpenChange });

  return (
    <ModalLayout
      open={open}
      onOpenChange={handleModalOpenChange}
      title={`모임 만들기 ${currentStep}/${TOTAL_STEPS}`}
      onConfirm={currentStep === TOTAL_STEPS ? handleSubmit : handleNext}
      confirmText={currentStep === TOTAL_STEPS ? "모임 만들기" : "다음"}
      onPrevious={currentStep > 1 ? handlePrevious : undefined}
      showPrevious={currentStep > 1}
      onCancel={currentStep === 1 ? () => onOpenChange(false) : undefined}
      showCancel={currentStep === 1}
    >
      <MoimAddChapter
        currentStep={currentStep}
        formData={formData}
        onFieldChange={handleFieldChange}
        onServiceChange={handleServiceChange}
      />
    </ModalLayout>
  );
};

export default MoimAddModal;
