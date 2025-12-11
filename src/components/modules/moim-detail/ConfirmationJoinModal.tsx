import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ConfirmationJoinModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleloginPage = () => {
    const current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    router.push(`/login?redirect=${encodeURIComponent(current)}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-10 w-full rounded-[12px] bg-green-500 text-sm font-bold text-white sm:h-12 sm:text-base md:h-15 md:text-xl md:font-semibold">
          참여하기
        </button>
      </DialogTrigger>
      <DialogContent className="h-[216px] w-[342px] rounded-3xl">
        <DialogHeader className="flex justify-end">
          <DialogTitle className="text-lg font-semibold">로그인이 필요한 서비스입니다.</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex w-full flex-row items-end justify-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-1/2 border border-gray-100 text-base font-medium text-gray-500 shadow-none"
            >
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleloginPage} className="w-1/2 bg-green-500 text-base font-bold">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationJoinModal;
