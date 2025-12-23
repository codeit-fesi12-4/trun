import { putUpdateProfile } from "@/api/user.api";
import { UserProfile } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// 회원 정보 수정
export const useUpdateProfileMutationQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => putUpdateProfile(formData),
    onSuccess: res => {
      if (!res.ok) {
        toast(res.message);
        return;
      }
      queryClient.setQueryData<UserProfile>(["userProfile"], res.data);
      toast("프로필이 수정되었습니다");
    },
    onError: error => {
      if (error instanceof Error) toast(error.message);
      else toast("프로필 업데이트 중 오류가 발생했습니다");
    },
  });
};
