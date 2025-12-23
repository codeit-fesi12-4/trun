import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .refine(
        (value: string) => {
          // 값이 있을 때만 검증
          if (!value) return true;
          return value.length >= 2;
        },
        {
          message: "이름은 2자 이상 입력해주세요.",
        },
      ),
    email: z
      .string()
      .trim()
      .refine((value: string) => !value || z.email().safeParse(value).success, {
        message: "올바른 이메일 형식을 입력해주세요.",
      }),
    companyName: z
      .string()
      .trim()
      .refine(
        (value: string) => {
          // 값이 있을 때만 검증
          if (!value) return true;
          return value.length >= 2;
        },
        {
          message: "크루명은 2자 이상 입력해주세요.",
        },
      ),
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
          message: "비밀번호는 8자 이상 32자 이하여야 합니다.",
        },
      ),
    confirmPassword: z
      .string()
      .trim()
      .refine(
        (value: string) => {
          // 값이 있을 때만 검증
          if (!value) return true;
          return value.length > 0;
        },
        {
          message: "비밀번호를 다시 입력해주세요.",
        },
      ),
  })
  .refine(
    data => !data.password || !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    },
  );
