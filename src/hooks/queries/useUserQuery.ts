import { getUserProfile, putUpdateProfile } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// 회원 정보 호출
export const useUserProfileQuery = (enabled = false) =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
    enabled,
    retry: false,
    staleTime: 1000 * 60,
    select: res => (res.ok ? res.data : undefined),
  });

// 회원 정보 수정
export const useUpdateProfileQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => putUpdateProfile(formData),
    onSuccess: res => {
      if (!res.ok) {
        toast(res.message);
        return;
      }
      toast("프로필이 수정되었습니다");

      void queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
    },
  });
};
