import Image from "next/image";
import { ReactNode } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  formTitle: string;
  footerSlot: ReactNode;
  heroTitle?: string;
  heroCopy?: string[];
}

const DEFAULT_HERO_COPY = ["바쁜 일상 속 잠깐의 휴식,", "이제는 같이 달랭과 함께 해보세요"];

const AuthLayout = ({
  children,
  formTitle,
  footerSlot,
  heroTitle = "Welcome to 같이 달랭!",
  heroCopy = DEFAULT_HERO_COPY,
}: AuthLayoutProps) => (
  <section className="bg-gray-100">
    <div className="mobile:px-6 mobile:py-10 pc:px-10 pc:py-16 mx-auto flex min-h-screen max-w-[1220px] items-center justify-center px-4 py-8">
      <div className="pc:grid-cols-[1.2fr_0.9fr] pc:gap-8 pc:justify-items-center grid w-full items-start justify-items-center gap-0">
        <div className="pc:max-w-[588px] flex w-full max-w-[420px] flex-col items-center gap-2 text-center">
          <div className="space-y-2 text-center">
            <p className="tablet:text-2xl pc:text-2xl text-xl font-semibold text-gray-800">
              {heroTitle}
            </p>
            <div className="tablet:text-base pc:text-base text-sm leading-6 font-medium text-gray-800">
              {heroCopy.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="pc:max-w-[588px] tablet:max-w-[407px] relative mx-auto w-full max-w-[290px]">
            <Image
              src="/images/img_login.png"
              alt="환영 일러스트"
              width={620}
              height={513}
              sizes="(min-width: 1920px) 588px, (min-width: 744px) 407px, (min-width: 375px) 290px, 90vw"
              className="h-auto w-full object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

        <Card className="mobile:max-w-[480px] pc:rounded-2xl mx-auto w-full max-w-[440px] border border-gray-200 bg-white shadow-xl">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="tablet:text-2xl pc:text-2xl text-xl font-semibold text-gray-800">
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
