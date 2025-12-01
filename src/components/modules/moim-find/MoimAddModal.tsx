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

const MoimAddModal = ({ open, onOpenChange }: MoimAddModalProps) => {
  const createMoimMutation = useCreateMoimMutation();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image: null as File | null,
    services: [] as string[],
    meetingDate: undefined as Date | undefined,
    deadlineDate: undefined as Date | undefined,
    maxParticipants: "",
  });

  // 서비스 선택을 MoimType으로 변환
  const convertServiceToType = (service: string): MoimType | null => {
    if (service === "달램핏-오피스 스트레칭") return "OFFICE_STRETCHING";
    if (service === "달램핏-마인드풀니스") return "MINDFULNESS";
    if (service === "워케이션") return "WORKATION";
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
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      alert("모임 이름을 입력해주세요.");
      return;
    }
    if (!formData.location) {
      alert("장소를 선택해주세요.");
      return;
    }
    if (!formData.image) {
      alert("이미지를 첨부해주세요.");
      return;
    }
    if (formData.services.length === 0) {
      alert("서비스를 선택해주세요.");
      return;
    }
    if (!formData.meetingDate) {
      alert("모임 날짜를 선택해주세요.");
      return;
    }
    // 마감 날짜가 모임 날짜보다 이후인지 검증
    if (formData.deadlineDate && formData.deadlineDate >= formData.meetingDate) {
      alert("마감 날짜는 모임 날짜보다 이전이어야 합니다.");
      return;
    }
    if (!formData.maxParticipants || Number(formData.maxParticipants) < 5) {
      alert("모집 정원은 최소 5인 이상 입력해주세요.");
      return;
    }

    // 서비스를 type으로 변환
    const selectedType = convertServiceToType(formData.services[0]);
    if (!selectedType) {
      alert("유효한 서비스를 선택해주세요.");
      return;
    }

    // CreateMoimRequest 형식으로 변환
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
        setFormData({
          title: "",
          location: "",
          image: null,
          services: [],
          meetingDate: undefined,
          deadlineDate: undefined,
          maxParticipants: "",
        });
      })
      .catch(error => {
        alert(`모임 생성에 실패했습니다: ${error.message}`);
      });
  };

  return (
    <ModalLayout
      open={open}
      onOpenChange={onOpenChange}
      title="모임 만들기"
      onConfirm={handleSubmit}
    >
      <div className="flex flex-col gap-4 py-4">
        {/* 모임 이름 */}
        <MoimInputField
          id="title"
          label="모임 이름"
          placeholder="모임 이름을 작성해주세요"
          value={formData.title}
          onChange={value => handleFieldChange("title", value)}
          type="text"
        />

        {/* 장소 */}
        <MoimPlaceSelectField
          id="location"
          label="장소"
          placeholder="장소를 선택해주세요"
          value={formData.location}
          onValueChange={value => handleFieldChange("location", value)}
        />

        {/* 이미지 */}
        <MoimInputField
          id="image"
          label="이미지"
          placeholder="이미지를 첨부해주세요"
          onChange={value => handleFieldChange("image", value)}
          type="image"
          fileName={formData.image?.name}
        />

        {/* 선택 서비스 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">선택 서비스</label>
          <div className="flex gap-2 sm:gap-3">
            <ServieCheckboxField
              id="service-1"
              title="달램핏"
              subtitle="오피스 스트레칭"
              service="달램핏-오피스 스트레칭"
              isSelected={formData.services.includes("달램핏-오피스 스트레칭")}
              onServiceChange={handleServiceChange}
              checkColor="orange-600"
            />
            <ServieCheckboxField
              id="service-2"
              title="달램핏"
              subtitle="마인드풀니스"
              service="달램핏-마인드풀니스"
              isSelected={formData.services.includes("달램핏-마인드풀니스")}
              onServiceChange={handleServiceChange}
              checkColor="orange-500"
            />
            <ServieCheckboxField
              id="service-3"
              title="워케이션"
              service="워케이션"
              isSelected={formData.services.includes("워케이션")}
              onServiceChange={handleServiceChange}
              checkColor="orange-500"
            />
          </div>
        </div>

        {/* 모임 날짜 / 마감 날짜 */}
        <div className="flex flex-col gap-4 sm:flex-row">
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
        </div>

        {/* 모집 정원 */}
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
    </ModalLayout>
  );
};

export default MoimAddModal;
