"use client";

import { useState } from "react";
import { useCreateMoimMutation } from "@/hooks/api/moim.api";
import { CreateMoimRequest, MoimType } from "@/types/moim.type";
import MoimDatePickerField from "./moim-add-modal/MoimDatePickerField";
import ModalLayout from "@/components/layouts/ModalLayout";
import ServieCheckboxField from "./moim-add-modal/ServieCheckboxField";
import MoimInputField from "./moim-add-modal/MoimInputField";
import MoimPlaceSelectField from "./moim-add-modal/MoimPlaceSelectField";

type MoimAddModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TOTAL_STEPS = 3;

const MoimAddModal = ({ open, onOpenChange }: MoimAddModalProps) => {
  const createMoimMutation = useCreateMoimMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image: null as File | null,
    service: "" as string,
    meetingDate: undefined as Date | undefined,
    deadlineDate: undefined as Date | undefined,
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
    if (service === "달림핏") return "MINDFULNESS";
    if (service === "런케이션") return "WORKATION";
    return null;
  };

  // Date를 ISO 8601 형식으로 변환 (YYYY-MM-DDTHH:MM:SS.SSSZ)
  // toISOString()을 사용하면 자동으로 UTC 시간으로 변환되고 Z가 붙음
  const formatDateTime = (date: Date): string => date.toISOString();

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
      if (!formData.title.trim()) {
        alert("모임 이름을 입력해주세요.");
        return false;
      }
      if (!formData.location) {
        alert("장소를 선택해주세요.");
        return false;
      }
      if (!formData.image) {
        alert("이미지를 첨부해주세요.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!formData.meetingDate) {
        alert("모임 날짜를 선택해주세요.");
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
      dateTime: formatDateTime(formData.meetingDate),
      capacity: Number(formData.maxParticipants),
      image: formData.image,
      registrationEnd: formData.deadlineDate ? formatDateTime(formData.deadlineDate) : undefined,
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mb-4 flex flex-col gap-4 py-6">
            <p className="text-sm text-gray-600">원하시는 서비스를 선택해주세요</p>
            <div className="flex flex-col gap-3">
              <ServieCheckboxField
                title="달림핏"
                service="달림핏"
                isSelected={formData.service === "달림핏"}
                onServiceChange={handleServiceChange}
                iconSrc="/icons/dallimfit.svg"
                iconAlt="달림핏 아이콘"
              />
              <ServieCheckboxField
                title="런케이션"
                service="런케이션"
                isSelected={formData.service === "런케이션"}
                onServiceChange={handleServiceChange}
                iconSrc="/icons/runcation.svg"
                iconAlt="런케이션 아이콘"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-6 flex flex-col gap-6 py-6">
            <MoimInputField
              id="title"
              label="모임 이름"
              placeholder="모임 이름을 작성해주세요"
              value={formData.title}
              onChange={value => handleFieldChange("title", value)}
              type="text"
            />
            <MoimPlaceSelectField
              id="location"
              label="장소"
              placeholder="장소를 선택해주세요"
              value={formData.location}
              onValueChange={value => handleFieldChange("location", value)}
            />
            <MoimInputField
              id="image"
              label="이미지"
              placeholder="이미지를 첨부해주세요"
              onChange={value => handleFieldChange("image", value)}
              type="image"
              fileName={formData.image?.name}
            />
          </div>
        );
      case 3:
        return (
          <div className="mb-6 flex flex-col gap-6 py-6">
            <MoimDatePickerField
              label="모임 날짜"
              date={formData.meetingDate}
              onDateChange={date => handleFieldChange("meetingDate", date)}
            />
            <MoimDatePickerField
              label="마감 날짜"
              date={formData.deadlineDate}
              onDateChange={date => handleFieldChange("deadlineDate", date)}
            />
            <MoimInputField
              id="maxParticipants"
              label="모집 정원"
              placeholder="최소 5인 이상 입력해주세요."
              value={formData.maxParticipants}
              onChange={value => handleFieldChange("maxParticipants", value)}
              type="number"
              min="5"
            />
          </div>
        );
      default:
        return null;
    }
  };

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
      {renderStepContent()}
    </ModalLayout>
  );
};

export default MoimAddModal;
