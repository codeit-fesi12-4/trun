export const getAuthErrorMessage = (error: string): string => {
  const errorMap: Record<string, string> = {
    CredentialsSignin: "이메일 또는 비밀번호가 올바르지 않습니다.",
    Configuration: "서버 설정 오류가 발생했습니다.",
    AccessDenied: "접근이 거부되었습니다.",
  };

  return errorMap[error] ?? "로그인 중 오류가 발생했습니다.";
};
