"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField } from "@/components/modules/auth/AuthPasswordField";
import { AuthTextField } from "@/components/modules/auth/AuthTextField";
import { Button } from "@/components/ui/button";
import { validateLogin, type LoginErrors } from "@/utils/validators.utils";
import { getAuthErrorMessage } from "@/utils/authError.util";

const LoginClient = () => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    setServerError(null);

    if (Object.keys(nextErrors).length === 0) {
      setIsLoading(true);
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setServerError(getAuthErrorMessage(result.error));
        } else if (result?.ok) {
          router.push(redirect ?? "/");
        }
      } catch {
        setServerError("로그인 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(redirect ?? "/");
    }
  }, [status, router, redirect]);

  if (status === "authenticated" || status === "loading") {
    return null;
  }

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <AuthLayout
      formTitle="로그인"
      footerSlot={
        <p className="text-base font-medium text-gray-800">
          같이 달림이 처음이신가요?{" "}
          <Link
            href="/signup"
            className="text-base font-medium text-green-600 underline underline-offset-4"
          >
            회원가입
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={event => void handleSubmit(event)} noValidate>
        <AuthTextField
          id="login-email"
          label="아이디"
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value.replace(/\s/g, ""));
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
            setPassword(event.target.value.replace(/\s/g, ""));
            if (serverError) setServerError(null);
            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
        />
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`h-11 w-full rounded-lg text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            isFormValid
              ? "cursor-pointer bg-green-600 text-white hover:bg-green-800"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
        {serverError ? <p className="text-sm font-semibold text-red-600">{serverError}</p> : null}
      </form>
    </AuthLayout>
  );
};

export default LoginClient;
