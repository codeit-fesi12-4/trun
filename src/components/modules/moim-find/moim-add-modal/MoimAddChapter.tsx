import MoimDatePickerField from "./MoimDatePickerField";
import ServieCheckboxField from "./ServieCheckboxField";
import MoimInputField from "./MoimInputField";
import MoimPlaceSelectField from "./MoimPlaceSelectField";
import { MIN_CAPACITY } from "@/constants/moim";
import { type MoimFormData } from "@/types/moimFind.type";
import { MoimType } from "@/types/moim.type";

type MoimAddChapterProps = {
  currentStep: number;
  formData: MoimFormData;
  onFieldChange: (
    field: keyof MoimFormData,
    value: string | File | null | Date | undefined,
  ) => void;
  onServiceChange: (service: MoimType) => void;
};

export const MoimAddChapter = ({
  currentStep,
  formData,
  onFieldChange,
  onServiceChange,
}: MoimAddChapterProps) => {
  switch (currentStep) {
    case 1:
      return (
        <div className="mb-4 flex flex-col gap-4 py-6">
          <p className="text-sm text-gray-600">원하시는 서비스를 선택해주세요</p>
          <div className="flex flex-col gap-3">
            <ServieCheckboxField
              title="달림핏"
              service="MINDFULNESS"
              isSelected={formData.type === "MINDFULNESS"}
              onServiceChange={onServiceChange}
              iconSrc="/icons/dallimfit.svg"
              iconAlt="달림핏 아이콘"
            />
            <ServieCheckboxField
              title="런케이션"
              service="WORKATION"
              isSelected={formData.type === "WORKATION"}
              onServiceChange={onServiceChange}
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
            id="name"
            label="모임 이름"
            placeholder="모임 이름을 작성해주세요"
            value={formData.name}
            onChange={value => onFieldChange("name", value)}
            type="text"
          />
          <MoimPlaceSelectField
            id="location"
            label="장소"
            placeholder="장소를 선택해주세요"
            value={formData.location}
            onValueChange={value => onFieldChange("location", value)}
          />
          <MoimInputField
            id="image"
            label="이미지"
            placeholder="이미지를 첨부해주세요"
            onChange={value => onFieldChange("image", value)}
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
            date={formData.dateTime}
            onDateChange={date => onFieldChange("dateTime", date)}
          />
          <MoimDatePickerField
            label="마감 날짜"
            date={formData.registrationEnd}
            onDateChange={date => onFieldChange("registrationEnd", date)}
          />
          <MoimInputField
            id="capacity"
            label="모집 정원"
            placeholder={`최소 ${MIN_CAPACITY}인 이상 입력해주세요.`}
            value={formData.capacity}
            onChange={value => onFieldChange("capacity", value)}
            type="number"
            min={MIN_CAPACITY.toString()}
          />
        </div>
      );
    default:
      return null;
  }
};
