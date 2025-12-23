import { loginSchema } from "@/types/schemas/login.schema";
import { type LoginForm, type LoginErrors } from "@/types/auth.type";
import { z } from "zod";

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export type { LoginForm, LoginErrors };

export type SignupForm = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
};

export type SignupErrors = {
  name?: string;
  email?: string;
  companyName?: string;
  password?: string;
  confirmPassword?: string;
};

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
    result.error.issues.forEach((err: z.ZodIssue) => {
      const field = err.path[0];
      if (field === "email") errors.email = err.message;
      else if (field === "password") errors.password = err.message;
    });
    return errors;
  }
  return {};
};

export const validateSignup = (values: SignupForm, duplicateEmails: string[]): SignupErrors => {
  const nextErrors: SignupErrors = {};
  if (!values.name.trim()) {
    nextErrors.name = "이름을 입력해주세요.";
  }
  const normalizedEmail = values.email.trim().toLowerCase();
  if (!normalizedEmail) {
    nextErrors.email = "이메일을 입력해주세요.";
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    nextErrors.email = "올바른 이메일을 입력해주세요.";
  } else if (duplicateEmails.includes(normalizedEmail)) {
    nextErrors.email = "중복된 이메일입니다.";
  }
  if (!values.companyName.trim()) {
    nextErrors.companyName = "크루명을 정확하게 입력해주세요.";
  }
  if (!values.password) {
    nextErrors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    nextErrors.password = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (!values.confirmPassword) {
    nextErrors.confirmPassword = "비밀번호를 다시 입력해주세요.";
  } else if (values.password && values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  return nextErrors;
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
