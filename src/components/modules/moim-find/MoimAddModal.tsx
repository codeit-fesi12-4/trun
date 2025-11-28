"use client";

import { useState } from "react";
import MoimDatePickerField from "./moim-add-modal/MoimDatePickerField";
import ModalLayout from "@/components/layouts/ModalLayout";
import ServieCheckboxField from "./moim-add-modal/ServieCheckboxField";
import MoimInputField from "./moim-add-modal/MoimInputField";
import MoimPlaceSelectField from "./moim-add-modal/MoimPlaceSelectField";

interface IMoimAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MoimAddModal = ({ open, onOpenChange }: IMoimAddModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image: null as File | null,
    services: [] as string[],
    meetingDate: undefined as Date | undefined,
    deadlineDate: undefined as Date | undefined,
    maxParticipants: "",
  });

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
    // TODO: 모임 생성 API 호출
    // 모임 생성 로직 구현 필요
    onOpenChange(false);
    // 폼 초기화
    setFormData({
      title: "",
      location: "",
      image: null,
      services: [],
      meetingDate: undefined,
      deadlineDate: undefined,
      maxParticipants: "",
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
