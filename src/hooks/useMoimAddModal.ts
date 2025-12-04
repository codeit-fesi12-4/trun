import { useState } from "react";
import { useCreateMoimMutation } from "@/hooks/api/moim.api";
import { CreateMoimRequest, MoimType } from "@/types/moim.type";
import { MOIM_TYPE } from "@/constants";
import { dateToISO } from "@/utils/date.util";

// 모임 생성 챕터
export const TOTAL_STEPS = 3;

type FormData = {
  title: string;
  location: string;
  image: File | null;
  service: string;
  meetingDate: Date | undefined;
  deadlineDate: Date | undefined;
  maxParticipants: string;
};

type UseMoimAddModalProps = {
  onOpenChange: (open: boolean) => void;
};

export const useMoimAddModal = ({ onOpenChange }: UseMoimAddModalProps) => {
  const createMoimMutation = useCreateMoimMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    location: "",
    image: null,
    service: "",
    meetingDate: undefined,
    deadlineDate: undefined,
    maxParticipants: "",
  });

  const handleModalOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      // 모달이 닫힐 때 초기화
      setCurrentStep(1);
      setFormData({
        title: "",
        location: "",
        image: null,
        service: "",
        meetingDate: undefined,
        deadlineDate: undefined,
        maxParticipants: "",
      });
    } else {
      // 모달이 열릴 때 1단계로 초기화
      setCurrentStep(1);
    }
  };

  // 서비스 선택을 MoimType으로 변환
  const convertServiceToType = (service: string): MoimType | null => {
    if (service === "달림핏") return MOIM_TYPE.DALLIMFIT;
    if (service === "런케이션") return MOIM_TYPE.RUNCATION;
    return null;
  };

  const handleFieldChange = (field: string, value: string | File | null | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      service: prev.service === service ? "" : service,
    }));
  };

  // 단계별 유효성 검사
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.service) {
        alert("서비스를 선택해주세요.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.title.trim() || !formData.location || !formData.image) {
        alert("모든 항목을 입력해주세요.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.meetingDate) {
        alert("모든 항목을 입력해주세요.");
        return false;
      }
      // 마감 날짜가 모임 날짜보다 이후인지 검증
      if (formData.deadlineDate && formData.deadlineDate >= formData.meetingDate) {
        alert("마감 날짜는 모임 날짜보다 이전이어야 합니다.");
        return false;
      }
      if (!formData.maxParticipants || Number(formData.maxParticipants) < 5) {
        alert("모집 정원은 최소 5인 이상 입력해주세요.");
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
    // 최종 유효성 검사
    if (!validateStep(3)) {
      return;
    }

    // 서비스를 type으로 변환
    const selectedType = convertServiceToType(formData.service);
    if (!selectedType) {
      alert("유효한 서비스를 선택해주세요.");
      return;
    }

    // CreateMoimRequest 형식으로 변환
    if (!formData.meetingDate || !formData.image) {
      alert("필수 항목이 누락되었습니다.");
      return;
    }

    const payload: CreateMoimRequest = {
      name: formData.title,
      location: formData.location,
      type: selectedType,
      dateTime: dateToISO(formData.meetingDate),
      capacity: Number(formData.maxParticipants),
      image: formData.image,
      registrationEnd: formData.deadlineDate ? dateToISO(formData.deadlineDate) : undefined,
    };

    void createMoimMutation
      .mutateAsync(payload)
      .then(() => {
        alert("모임이 성공적으로 생성되었습니다!");
        onOpenChange(false);
      })
      .catch(error => {
        alert(`모임 생성에 실패했습니다: ${error.message}`);
      });
  };

  return {
    formData,
    currentStep,
    TOTAL_STEPS,
    handleModalOpenChange,
    handleFieldChange,
    handleServiceChange,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
};
