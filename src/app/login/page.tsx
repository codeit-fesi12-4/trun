"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField, AuthTextField } from "@/components/modules/auth/AuthFields";
import { Button } from "@/components/ui/button";
import { postSignin } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { validateLogin, LoginErrors as ValidationLoginErrors } from "@/utils/validators.utils";
import { getUserProfile } from "@/api/user.api";

type LoginErrors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { token, setToken, setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const signinMutation = useMutation({
    mutationFn: () => postSignin({ email, password }),
    onSuccess: async data => {
      setServerError(null);
      setToken(data.token);
      const profile = await getUserProfile();
      setUser(profile);
      router.push("/");
    },
    onError: error => {
      setServerError(error.message);
    },
  });

  const validate = (): LoginErrors => validateLogin({ email, password }) as ValidationLoginErrors;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      signinMutation.mutate();
    }
  };

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  if (token) {
    return null;
  }

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <AuthLayout
      formTitle="로그인"
      footerSlot={
        <p className="text-base font-medium text-gray-800">
          같이 달랭이 처음이신가요?{" "}
          <Link
            href="/signup"
            className="text-base font-medium text-green-600 underline underline-offset-4"
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
          value={email}
          onChange={event => {
            setEmail(event.target.value);
            if (serverError) setServerError(null);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
        />
        <AuthPasswordField
          id="login-password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
            if (serverError) setServerError(null);
            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
        />
        <Button
          type="submit"
          disabled={!isFormValid || signinMutation.isPending}
          className={`h-11 w-full rounded-lg text-base font-semibold transition-colors disabled:opacity-50 ${
            isFormValid ? "bg-green-600 text-white hover:bg-green-800" : "bg-gray-100 text-gray-400"
          }`}
        >
          {signinMutation.isPending ? "로그인 중..." : "로그인"}
        </Button>
        {serverError ? <p className="text-sm font-semibold text-red-600">{serverError}</p> : null}
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
