"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField, AuthTextField } from "@/components/modules/auth/AuthFields";
import { Button } from "@/components/ui/button";
import { LoginErrors, LoginForm, validateLogin } from "@/utils/validators";

const LoginPage = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validateLogin(form));
  };

  return (
    <AuthLayout
      formTitle="로그인"
      footerSlot={
        <p className="text-base font-medium text-gray-800">
          같이 달랭이 처음이신가요?{" "}
          <Link
            href="/signup"
            className="text-base font-medium text-orange-600 underline underline-offset-4"
          >
            회원가입
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthTextField
          id="login-email"
          label="아이디"
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />
        <AuthPasswordField
          id="login-password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          value={form.password}
          onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
          error={errors.password}
        />
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-gray-500 text-base font-semibold text-white transition-colors hover:bg-gray-600"
        >
          로그인
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
