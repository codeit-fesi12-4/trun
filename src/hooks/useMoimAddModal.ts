import { useState } from "react";
import { useCreateMoimMutation } from "@/hooks/queries/useMoimFindQuery";
import { CreateMoimRequest, MoimType } from "@/types/moim.type";
import { dateToISO } from "@/utils/date.util";
import {
  TOTAL_STEPS,
  INITIAL_FORM_DATA,
  MIN_CAPACITY,
  MAX_NAME_LENGTH,
  MAX_IMAGE_SIZE,
} from "@/constants/moim";
import { type MoimFormData } from "@/types/moimFind.type";
import { toast } from "sonner";

type UseMoimAddModalProps = {
  onOpenChange: (open: boolean) => void;
};

export const useMoimAddModal = ({ onOpenChange }: UseMoimAddModalProps) => {
  const createMoimMutation = useCreateMoimMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<MoimFormData>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    image?: string;
  }>({});

  const handleModalOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // 모달이 완전히 닫힌 후 상태 초기화 (애니메이션 완료 대기)
      setTimeout(() => {
        setCurrentStep(1);
        setFormData(INITIAL_FORM_DATA);
        setFieldErrors({});
      }, 300); // Dialog 애니메이션 시간 고려 (보통 200-300ms)
    }
  };

  const handleFieldChange = (
    field: keyof MoimFormData,
    value: string | File | null | Date | undefined,
  ) => {
    // 필드별 유효성 검사
    if (field === "name") {
      const nameValue = value as string;
      if (nameValue.length > MAX_NAME_LENGTH) {
        setFieldErrors(prev => ({
          ...prev,
          name: `모임 이름은 최대 ${MAX_NAME_LENGTH}자까지 입력 가능합니다.`,
        }));
        return; // 최대 길이 초과 시 업데이트하지 않음
      }
      setFieldErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, ...rest } = prev;
        return rest;
      });
    }

    if (field === "image") {
      const imageFile = value as File | null;
      if (imageFile && imageFile.size > MAX_IMAGE_SIZE) {
        setFieldErrors(prev => ({
          ...prev,
          image: "이미지 파일 크기는 20MB를 초과할 수 없습니다.",
        }));
        return; // 용량 초과 시 업데이트하지 않음
      }
      setFieldErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...rest } = prev;
        return rest;
      });
    }

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
      if (!formData.name.trim() || !formData.location) {
        toast.error("모든 필수 항목을 입력해주세요.");
        return false;
      }
      // 모임 이름 길이 검증
      if (formData.name.length > MAX_NAME_LENGTH) {
        toast.error(`모임 이름은 최대 ${MAX_NAME_LENGTH}자까지 입력 가능합니다.`);
        return false;
      }
      // 이미지 용량 검증 (이미지가 있는 경우에만)
      if (formData.image && formData.image.size > MAX_IMAGE_SIZE) {
        toast.error("이미지 파일 크기는 20MB를 초과할 수 없습니다.");
        return false;
      }
      return true;
    }
    if (step === TOTAL_STEPS) {
      if (!formData.dateTime) {
        toast.error("모든 필수 항목을 입력해주세요.");
        return false;
      }
      // 마감 날짜가 모임 날짜보다 이후인지 검증
      if (formData.registrationEnd && formData.registrationEnd >= formData.dateTime) {
        toast.error("마감 날짜는 모임 날짜보다 이전이어야 합니다.");
        return false;
      }
      // 모집 정원이 입력된 경우에만 최소값 검증
      if (
        formData.capacity &&
        formData.capacity.trim() !== "" &&
        Number(formData.capacity) < MIN_CAPACITY
      ) {
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
    if (!formData.dateTime || !formData.type) {
      return;
    }

    const payload: CreateMoimRequest = {
      name: formData.name,
      location: formData.location,
      type: formData.type,
      dateTime: dateToISO(formData.dateTime),
      capacity:
        formData.capacity && formData.capacity.trim() !== ""
          ? Number(formData.capacity)
          : MIN_CAPACITY,
      image: formData.image || undefined,
      registrationEnd: formData.registrationEnd ? dateToISO(formData.registrationEnd) : undefined,
    };

    void createMoimMutation
      .mutateAsync(payload)
      .then(() => {
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
    fieldErrors,
  };
};
