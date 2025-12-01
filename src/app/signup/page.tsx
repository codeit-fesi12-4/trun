"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField, AuthTextField } from "@/components/modules/auth/AuthFields";
import { Button } from "@/components/ui/button";
import { postSignup } from "@/hooks/api/auth";
import { SignupErrors, SignupForm, validateSignup } from "@/utils/validators.utils";

const DUPLICATE_EMAILS = ["cheda@codeit.com"];

const SignupPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const signupMutation = useMutation({
    mutationFn: () =>
      postSignup({
        name: form.name,
        email: form.email,
        companyName: form.companyName,
        password: form.password,
      }),
    onSuccess: () => {
      setServerError(null);
      router.push("/login");
    },
    onError: error => {
      setServerError((error as Error).message);
    },
  });

  const handleChange = (field: keyof SignupForm) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setServerError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateSignup(form, DUPLICATE_EMAILS);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      signupMutation.mutate();
    }
  };

  return (
    <AuthLayout
      formTitle="회원가입"
      footerSlot={
        <p className="text-base font-medium text-gray-800">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="text-base font-medium text-orange-600 underline underline-offset-4"
          >
            로그인
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <AuthTextField
          id="signup-name"
          label="이름"
          placeholder="이름을 입력해주세요."
          autoComplete="name"
          value={form.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <AuthTextField
          id="signup-email"
          label="아이디"
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />
        <AuthTextField
          id="signup-company"
          label="회사명"
          placeholder="회사명을 입력해주세요."
          autoComplete="organization"
          value={form.companyName}
          onChange={handleChange("companyName")}
          error={errors.companyName}
        />
        <AuthPasswordField
          id="signup-password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
        />
        <AuthPasswordField
          id="signup-password-confirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
        />
        <Button
          type="submit"
          disabled={signupMutation.isPending}
          className="h-11 w-full rounded-lg bg-gray-500 text-base font-semibold text-white transition-colors hover:bg-gray-600"
        >
          {signupMutation.isPending ? "진행 중..." : "확인"}
        </Button>
        {serverError ? <p className="text-sm font-semibold text-red-600">{serverError}</p> : null}
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
