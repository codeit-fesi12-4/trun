import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type AuthLayoutProps = {
  children: ReactNode;
  formTitle: string;
  footerSlot: ReactNode;
  heroTitle?: string;
  heroCopy?: string[];
};

const AuthLayout = ({
  children,
  formTitle,
  footerSlot,
  heroTitle = "",
  heroCopy = [],
}: AuthLayoutProps) => (
  <section className="relative flex min-h-[calc(100vh-50px)] items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50 md:min-h-[calc(100vh-88px)]">
    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 py-4 sm:px-6 sm:py-8 md:px-10 md:py-12">
      <div className="grid w-full items-center justify-items-center gap-0 sm:gap-8 md:grid-cols-[1.2fr_0.9fr] md:justify-items-center">
        <div className="flex w-full max-w-[420px] flex-col items-center gap-2 text-center md:max-w-[588px]">
          <div className="space-y-2 text-center">
            <p className="text-xl font-semibold text-gray-800 sm:text-2xl md:text-2xl">
              {heroTitle}
            </p>
            <div className="text-sm leading-6 font-medium text-gray-800 sm:text-base md:text-base">
              {heroCopy.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[250px] pb-6 sm:max-w-[350px] sm:pb-0 md:max-w-[500px]">
            <h2 className="pb-1 text-2xl font-bold sm:text-3xl">Welcome to 같이 달림! </h2>
            <p className="text-base font-medium sm:text-lg">
              다양한 러닝 모임을 찾고 <br />
              함께 달려보세요.
            </p>
            <p> </p>
            <Image
              src="/images/img_login.png"
              alt="환영 일러스트"
              width={620}
              height={513}
              sizes="(min-width: 1920px) 588px, (min-width: 744px) 407px, (min-width: 375px) 290px, 90vw"
              className="h-auto w-full object-contain drop-shadow-sm"
              priority
              fetchPriority="high"
            />
          </div>
        </div>

        <Card className="mx-auto w-full max-w-[440px] border border-gray-50 bg-white shadow-xl sm:max-w-[480px] md:rounded-2xl">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-xl font-semibold text-gray-800 sm:text-2xl md:text-2xl">
              {formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">{children}</CardContent>
          <CardFooter className="justify-center border-t pt-4 text-sm text-gray-700">
            {footerSlot}
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
);

export default AuthLayout;
