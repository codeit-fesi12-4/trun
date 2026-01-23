import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((value: string) => !value || z.email().safeParse(value).success, {
      message: "올바른 이메일 형식을 입력해주세요.",
    }),
  password: z
    .string()
    .trim()
    .refine(
      (value: string) => {
        // 값이 있을 때만 길이 검증
        if (!value) return true;
        return value.length >= 8 && value.length <= 32;
      },
      {
        message: "비밀번호는 8자 이상 입력해주세요.",
      },
    ),
});
