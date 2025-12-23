import { loginSchema } from "@/types/schemas/login.schema";
import { signupSchema } from "@/types/schemas/signup.schema";
import {
  type LoginForm,
  type LoginErrors,
  type SignupForm,
  type SignupErrors,
} from "@/types/auth.type";

export type { LoginForm, LoginErrors, SignupForm, SignupErrors };

export type UpdateProfileForm = {
  companyName: string;
  image?: string;
  file?: File | null;
};

export type UpdateProfileErrors = {
  companyName?: string;
  image?: string;
  file?: string;
};

export const validateLogin = (values: LoginForm): LoginErrors => {
  const result = loginSchema.safeParse(values);
  if (!result.success) {
    const errors: LoginErrors = {};
    result.error.issues.forEach(err => {
      const field = err.path[0];
      if (field === "email") errors.email = err.message;
      else if (field === "password") errors.password = err.message;
    });
    return errors;
  }
  return {};
};

export const validateSignup = (values: SignupForm, duplicateEmails: string[]): SignupErrors => {
  const result = signupSchema.safeParse(values);
  const errors: SignupErrors = {};

  // Zod 스키마 검증 결과 처리
  if (!result.success) {
    result.error.issues.forEach(err => {
      const field = err.path[0];
      if (
        typeof field === "string" &&
        (field === "name" ||
          field === "email" ||
          field === "companyName" ||
          field === "password" ||
          field === "confirmPassword")
      ) {
        errors[field] = err.message;
      }
    });
  }

  // 중복 이메일 체크 (스키마 검증 통과 후 별도로 체크)
  const normalizedEmail = values.email.trim().toLowerCase();
  if (normalizedEmail && duplicateEmails.includes(normalizedEmail)) {
    errors.email = "중복된 이메일입니다.";
  }

  return errors;
};

export const validateUpdateProfile = (values: UpdateProfileForm): UpdateProfileErrors => {
  const nextErrors: UpdateProfileErrors = {};

  if (!values.companyName.trim()) {
    nextErrors.companyName = "크루명을 정확하게 입력해주세요.";
  }
  if (values.file) {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(values.file.type)) {
      nextErrors.image = "지원하지 않는 이미지 형식입니다.";
    } else if (values.file.size > 5 * 1024 * 1024) {
      nextErrors.image = "이미지 파일은 5MB 이하로 업로드해주세요.";
    }
  }

  return nextErrors;
};
