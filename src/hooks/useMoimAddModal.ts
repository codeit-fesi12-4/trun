import { useState } from "react";
import { useCreateMoimMutation } from "@/hooks/useMoimFindQuery";
import { CreateMoimRequest, MoimType } from "@/types/moim.type";
import { dateToISO } from "@/utils/date.util";
import { TOTAL_STEPS, INITIAL_FORM_DATA, MIN_CAPACITY } from "@/constants/moim";
import { type MoimFormData } from "@/types/moimFind.type";
import { toast } from "sonner";

type UseMoimAddModalProps = {
  onOpenChange: (open: boolean) => void;
};

export const useMoimAddModal = ({ onOpenChange }: UseMoimAddModalProps) => {
  const createMoimMutation = useCreateMoimMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<MoimFormData>(INITIAL_FORM_DATA);

  const handleModalOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // 모달이 닫힐 때 초기화
      setCurrentStep(1);
      setFormData(INITIAL_FORM_DATA);
    }
  };

  const handleFieldChange = (
    field: keyof MoimFormData,
    value: string | File | null | Date | undefined,
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value as MoimFormData[keyof MoimFormData],
    }));
  };

  const handleServiceChange = (service: MoimType) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type === service ? "" : (service ?? ""),
    }));
  };

  // 단계별 유효성 검사
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.type) {
        toast.error("서비스를 선택해주세요.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.name.trim() || !formData.location || !formData.image) {
        toast.error("모든 항목을 입력해주세요.");
        return false;
      }
      return true;
    }
    if (step === TOTAL_STEPS) {
      if (!formData.dateTime || !formData.image) {
        toast.error("모든 항목을 입력해주세요.");
        return false;
      }
      // 마감 날짜가 모임 날짜보다 이후인지 검증
      if (formData.registrationEnd && formData.registrationEnd >= formData.dateTime) {
        toast.error("마감 날짜는 모임 날짜보다 이전이어야 합니다.");
        return false;
      }
      if (!formData.capacity || Number(formData.capacity) < MIN_CAPACITY) {
        toast.error(`모집 정원은 최소 ${MIN_CAPACITY}인 이상 입력해주세요.`);
        return false;
      }
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // 중복 제출 방지: 이미 제출 중이면 무시
    if (createMoimMutation.isPending) {
      return;
    }

    // 최종 유효성 검사
    if (!validateStep(TOTAL_STEPS)) {
      return;
    }

    // validateStep(3)에서 이미 검증했지만, 타입 가드를 위해 한 번 더 확인
    if (!formData.dateTime || !formData.image || !formData.type) {
      return;
    }

    const payload: CreateMoimRequest = {
      name: formData.name,
      location: formData.location,
      type: formData.type,
      dateTime: dateToISO(formData.dateTime),
      capacity: Number(formData.capacity),
      image: formData.image,
      registrationEnd: formData.registrationEnd ? dateToISO(formData.registrationEnd) : undefined,
    };

    void createMoimMutation
      .mutateAsync(payload)
      .then(() => {
        toast.success("모임이 성공적으로 생성되었습니다!");
        handleModalOpenChange(false);
      })
      .catch(error => {
        toast.error(`모임 생성에 실패했습니다: ${error.message}`);
      });
  };

  return {
    formData,
    currentStep,
    handleModalOpenChange,
    handleFieldChange,
    handleServiceChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    isSubmitting: createMoimMutation.isPending,
  };
};
