"use client";

import Link from "next/link";
import { type ChangeEvent, FormEvent, useState } from "react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField, AuthTextField } from "@/components/modules/auth/AuthFields";
import { Button } from "@/components/ui/button";
import { SignupErrors, SignupForm, validateSignup } from "@/utils/validators";

const DUPLICATE_EMAILS = ["cheda@codeit.com"];

const SignupPage = () => {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignupErrors>({});

  const handleChange = (field: keyof SignupForm) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validateSignup(form, DUPLICATE_EMAILS));
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
          value={form.company}
          onChange={handleChange("company")}
          error={errors.company}
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
          className="h-11 w-full rounded-lg bg-gray-500 text-base font-semibold text-white transition-colors hover:bg-gray-600"
        >
          확인
        </Button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
