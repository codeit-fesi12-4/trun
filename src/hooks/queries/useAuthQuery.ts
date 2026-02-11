import { ApiResult } from "@/lib/apiClient";
import { postSignin } from "@/services/auth.service";
import { SigninRequest, SigninResponse } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSigninMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<SigninResponse>, Error, SigninRequest>({
    mutationFn: (payload: SigninRequest) => postSignin(payload),
    onSuccess: async data => {
      if (!data.ok) return;
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("로그인 되었습니다.");
    },
  });
};
