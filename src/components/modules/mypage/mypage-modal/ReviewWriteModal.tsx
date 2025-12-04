import ModalLayout from "@/components/layouts/ModalLayout";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCardData } from "@/types/mypage.type";

const ReviewWriteModal = ({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ReviewCardData;
}) => (
  <ModalLayout
    open={open}
    onOpenChange={onOpenChange}
    title="리뷰 쓰기"
    onConfirm={() => alert("리뷰 등록 클릭")}
    confirmText="리뷰 등록"
    onCancel={() => onOpenChange(false)}
    showCancel
  >
    {/* 폼 */}
    <div className="flex flex-col gap-12 pt-8 pb-8">
      <div>
        <h2 className="pb-2 text-lg font-medium text-gray-800">만족스러운 경험이었나요?</h2>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, score) => (
            <span
              key={score}
              className={`${score < (item.score ?? 0) ? "text-green-600" : "text-gray-100"} text-3xl`}
            >
              ♥
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="pb-2.5 text-lg font-medium text-gray-800">경험에 대해 남겨주세요.</h2>
        <Textarea
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
          className="h-52 text-base focus-visible:border-green-400 focus-visible:ring-0"
        />
      </div>
    </div>
  </ModalLayout>
);

export default ReviewWriteModal;
