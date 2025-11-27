"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DatePickerField from "./DatePickerField";
import Image from "next/image";

interface IMoimAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 선택 서비스 카드 컴포넌트
interface IServiceCardProps {
  id: string;
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onToggle: () => void;
  checkColor?: "orange-500" | "orange-600";
}

const ServiceCard = ({
  id,
  title,
  subtitle,
  isSelected,
  onToggle,
  checkColor = "orange-500",
}: IServiceCardProps) => (
  <label
    htmlFor={id}
    className={`flex flex-1 cursor-pointer items-start gap-1.5 rounded-lg border-2 p-2 transition-colors sm:gap-2 sm:p-3 ${
      isSelected
        ? "border-transparent bg-gray-900 text-white"
        : "border-transparent bg-white text-gray-700"
    }`}
  >
    <Checkbox
      id={id}
      checked={isSelected}
      onCheckedChange={onToggle}
      className={`mt-1 size-4 shrink-0 sm:size-5 ${
        isSelected
          ? checkColor === "orange-600"
            ? "data-[state=checked]:bg-white data-[state=checked]:text-orange-600! [&_svg]:stroke-[3px]"
            : "data-[state=checked]:bg-white data-[state=checked]:text-orange-500! [&_svg]:stroke-[3px]"
          : ""
      }`}
    />
    <div className="flex flex-col">
      <span className="text-sm font-semibold sm:text-base">{title}</span>
      {subtitle && <span className="text-xs sm:text-sm">{subtitle}</span>}
    </div>
  </label>
);

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

  const handleInputChange = (field: string, value: string | File | null | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("image", file);
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

  const formatDateTime = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd hh:mm a", { locale: ko });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6 sm:max-w-md md:max-w-lg [&>button[data-slot='dialog-close']]:top-5.5 [&>button[data-slot='dialog-close']]:right-5 [&>button[data-slot='dialog-close']]:sm:top-5 [&>button[data-slot='dialog-close']]:sm:right-6 [&>button[data-slot='dialog-close']>svg]:size-6">
        <DialogHeader className="text-left">
          <DialogTitle>모임 만들기</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* 모임 이름 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold text-gray-700">
              모임 이름
            </label>
            <Input
              id="title"
              placeholder="모임 이름을 작성해주세요"
              value={formData.title}
              onChange={e => handleInputChange("title", e.target.value)}
              className="border-transparent font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20"
            />
          </div>

          {/* 장소 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-semibold text-gray-700">
              장소
            </label>
            <Select
              value={formData.location}
              onValueChange={value => handleInputChange("location", value)}
            >
              <SelectTrigger
                id="location"
                className="w-full border-transparent font-semibold data-[placeholder]:!text-gray-400 [&>svg:last-child]:hidden"
              >
                <SelectValue placeholder="장소를 선택해주세요" />
                <Image
                  src="/icons/color=default, type=down.svg"
                  alt="dropdown"
                  width={28}
                  height={28}
                  className="size-6 shrink-0"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="서울">서울</SelectItem>
                <SelectItem value="부산">부산</SelectItem>
                <SelectItem value="대구">대구</SelectItem>
                <SelectItem value="인천">인천</SelectItem>
                <SelectItem value="광주">광주</SelectItem>
                <SelectItem value="대전">대전</SelectItem>
                <SelectItem value="울산">울산</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 이미지 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-sm font-semibold text-gray-700">
              이미지
            </label>
            <div className="flex gap-2">
              <Input
                id="image"
                type="text"
                placeholder="이미지를 첨부해주세요"
                value={formData.image?.name || ""}
                readOnly
                className="flex-1 border-transparent text-sm font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20 sm:text-base"
              />
              <label htmlFor="file-input">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer rounded-lg border-orange-600 px-2 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-600 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
                  asChild
                >
                  <span>파일 찾기</span>
                </Button>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 선택 서비스 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">선택 서비스</label>
            <div className="flex gap-2 sm:gap-3">
              <ServiceCard
                id="service-1"
                title="달램핏"
                subtitle="오피스 스트레칭"
                isSelected={formData.services.includes("달램핏-오피스 스트레칭")}
                onToggle={() => handleServiceToggle("달램핏-오피스 스트레칭")}
                checkColor="orange-600"
              />
              <ServiceCard
                id="service-2"
                title="달램핏"
                subtitle="마인드풀니스"
                isSelected={formData.services.includes("달램핏-마인드풀니스")}
                onToggle={() => handleServiceToggle("달램핏-마인드풀니스")}
                checkColor="orange-500"
              />
              <ServiceCard
                id="service-3"
                title="워케이션"
                isSelected={formData.services.includes("워케이션")}
                onToggle={() => handleServiceToggle("워케이션")}
                checkColor="orange-500"
              />
            </div>
          </div>

          {/* 모임 날짜 / 마감 날짜 */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <DatePickerField
              label="모임 날짜"
              date={formData.meetingDate}
              onDateChange={date => handleInputChange("meetingDate", date)}
              formatDateTime={formatDateTime}
            />
            <DatePickerField
              label="마감 날짜"
              date={formData.deadlineDate}
              onDateChange={date => handleInputChange("deadlineDate", date)}
              formatDateTime={formatDateTime}
            />
          </div>

          {/* 모집 정원 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="maxParticipants" className="text-sm font-semibold text-gray-700">
              모집 정원
            </label>
            <Input
              id="maxParticipants"
              type="number"
              placeholder="최소 5인 이상 입력해주세요."
              value={formData.maxParticipants}
              onChange={e => handleInputChange("maxParticipants", e.target.value)}
              min="5"
              className="border-transparent font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full border-transparent bg-gray-500 font-semibold text-white hover:bg-gray-600"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoimAddModal;
