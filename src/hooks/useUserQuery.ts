import { getUserProfile, updateProfile } from "@/api/user.api";
import { TEAM_NAME } from "@/constants/env";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// 유저 프로필 정보 가져오기 훅
export const useUserProfileQuery = ({
  teamName = TEAM_NAME,
  token,
  enabled = true,
}: {
  teamName?: string;
  token?: string | null;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["userProfile", teamName, token ?? "guest"],
    queryFn: async () => {
      const res = await getUserProfile();
      if (!res.ok) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.data;
    },
    staleTime: 1000 * 60,
    enabled,
  });

// 유저 프로필을 수정하기 훅
export const useUpdateProfileMutationQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData; token?: string | null }) => {
      const res = await updateProfile(formData);
      if (!res.ok) {
        throw new Error(res.message);
      }
      return res.data;
    },

    onSuccess: async data => {
      useAuthStore.getState().setUser(data);
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast("프로필이 수정되었습니다");
    },

    onError: error => {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("프로필 업데이트 중 오류가 발생했습니다");
      }
    },
  });
};
