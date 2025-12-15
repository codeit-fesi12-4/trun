import { Suspense } from "react";
import LoginClient from "@/components/modules/auth/LoginClient";

const LoginPage = () => (
  // 컴포넌트 내에 useSearchParams 사용 시, Suspense 컴포넌트 사용 권장
  <Suspense fallback={<div>로딩 중...</div>}>
    <LoginClient />
  </Suspense>
);

export default LoginPage;
