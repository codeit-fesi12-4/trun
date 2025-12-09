import { getUserProfile, updateProfile } from "@/api/user.api";
import { TEAM_NAME } from "@/constants";
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
    queryFn: () => getUserProfile(teamName, token),
    staleTime: 1000 * 60,
    enabled,
  });

// 유저 프로필을 수정하기 훅
export const useUpdateProfileMutationQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: { formData: FormData; token?: string | null }) =>
      updateProfile(formData, token),

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },

    onError: error => {
      if (error instanceof Error) {
        toast(error.message);
      }
    },
  });
};
