import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .refine(
      (value: string) => {
        // 값이 있을 때만 이메일 형식 검증
        if (!value) return true;
        return z.string().email().safeParse(value).success;
      },
      {
        message: "올바른 이메일 형식을 입력해주세요.",
      },
    ),
  password: z.string().refine(
    (value: string) => {
      // 값이 있을 때만 8자 이상 검증
      if (!value) return true;
      return value.length >= 8;
    },
    {
      message: "비밀번호는 8자 이상이어야 합니다.",
    },
  ),
});

// 로그인 폼 타입 추론
export type LoginForm = z.infer<typeof loginSchema>;

// 로그인 에러 타입 추론
export type LoginErrors = {
  email?: string;
  password?: string;
};
