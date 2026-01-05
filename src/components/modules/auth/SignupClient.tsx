"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "@/components/layouts/AuthLayout";
import { AuthPasswordField } from "@/components/modules/auth/AuthPasswordField";
import { AuthTextField } from "@/components/modules/auth/AuthTextField";
import { Button } from "@/components/ui/button";
import { postSignup } from "@/services/auth.service";
import { validateSignup } from "@/utils/validators.utils";
import { type SignupErrors, type SignupForm } from "@/types/auth.type";
import { toast } from "sonner";

const SignupClient = () => {
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
    onSuccess: result => {
      if (result.ok) {
        toast.success(result.data.message);
        setServerError(null);
        router.push("/login");
      } else {
        setServerError(result.message);
      }
    },
    onError: error => {
      setServerError((error as Error).message);
    },
  });

  const handleChange = (field: keyof SignupForm) => (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    // 이름과 크루명을 제외한 필드에서 띄어쓰기 제거
    if (field !== "name" && field !== "companyName") {
      value = value.replace(/\s/g, "");
    }
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setServerError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateSignup(form);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      signupMutation.mutate();
    }
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.companyName.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "";

  return (
    <AuthLayout
      formTitle="회원가입"
      footerSlot={
        <p className="text-base font-medium text-gray-800">
          이미 회원이신가요?{" "}
          <Link
            href="/login"
            className="text-base font-medium text-green-600 underline underline-offset-4"
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
          required
        />
        <AuthTextField
          id="signup-email"
          label="아이디"
          placeholder="이메일을 입력해주세요."
          autoComplete="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
          required
        />
        <AuthTextField
          id="signup-company"
          label="크루명"
          placeholder="크루명을 입력해주세요."
          autoComplete="organization"
          value={form.companyName}
          onChange={handleChange("companyName")}
          error={errors.companyName}
          required
        />
        <AuthPasswordField
          id="signup-password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
          required
        />
        <AuthPasswordField
          id="signup-password-confirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          required
        />
        <Button
          type="submit"
          disabled={!isFormValid || signupMutation.isPending}
          className={`h-11 w-full rounded-lg text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            isFormValid
              ? "cursor-pointer bg-green-600 text-white hover:bg-green-800"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {signupMutation.isPending ? "진행 중..." : "가입"}
        </Button>
        {serverError ? <p className="text-sm font-semibold text-red-600">{serverError}</p> : null}
      </form>
    </AuthLayout>
  );
};

export default SignupClient;
