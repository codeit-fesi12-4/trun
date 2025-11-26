import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const GatheringCategory = () => (
  <div>
    <Tabs defaultValue="달램핏" className="w-full">
      <TabsList className="mb-[10px] flex w-full justify-between bg-transparent">
        <div className="flex h-[38px] w-[194px] gap-2">
          <TabsTrigger
            value="달램핏"
            className="w-[83px] gap-[1px] px-[5px] py-[18px] text-lg font-semibold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none [&>svg]:!h-[32px] [&>svg]:!w-[32px]"
          >
            달램핏
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.5938 11.5C18.5938 12.4961 18.1083 13.3789 17.3611 13.9245L18.4413 14.1692C18.6672 14.2203 18.8571 14.3724 18.9564 14.5817L20.7839 18.4338C20.7957 18.4588 20.8064 18.484 20.8161 18.5094L23.8232 20.3681C24.293 20.6585 24.4384 21.2747 24.148 21.7445C23.8577 22.2143 23.2414 22.3597 22.7716 22.0694L19.3364 19.9461C19.2444 19.8892 19.1648 19.8198 19.0985 19.7414C18.9665 19.6401 18.8578 19.5042 18.7878 19.3394L18.5938 18.8828V20.8594C20.4052 21.7494 23.2484 23.6685 22.4582 25.4489C21.6134 27.3525 17.5299 26.2421 15.5938 25.4489C13.6577 26.2421 9.57429 27.3525 8.72944 25.4489C7.9393 23.6685 10.7825 21.7494 12.5938 20.8594V19.3227L12.5098 19.5206C12.4398 19.6855 12.3311 19.8213 12.1991 19.9226C12.1328 20.001 12.0532 20.0704 11.9611 20.1273L8.52591 22.2506C8.05612 22.5409 7.43989 22.3955 7.14951 21.9257C6.85914 21.4559 7.00458 20.8397 7.47437 20.5493L10.4815 18.6906C10.4911 18.6652 10.5018 18.64 10.5137 18.615L12.3412 14.7629C12.4404 14.5536 12.6303 14.4015 12.8562 14.3504L13.9813 14.0956C14.0048 14.088 14.0284 14.0809 14.0523 14.0742C13.1786 13.5498 12.5938 12.5932 12.5938 11.5C12.5938 9.84315 13.937 8.5 15.5938 8.5C17.2507 8.5 18.5938 9.84315 18.5938 11.5Z"
                fill="currentColor"
              />
              <path
                d="M9.59375 12.9243L11.5482 12.5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M9.61328 9.42627L11.5241 10.0168"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M11.5938 6.5L12.8545 7.78858"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M21.2881 12.5L19.3336 12.0757"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M21.5752 9.42627L19.6644 10.0168"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M19.5947 6.5L18.334 7.78858"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M15.5938 7L15.5937 5"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </TabsTrigger>
          <TabsTrigger
            value="워케이션"
            className="gap-[1px] px-[5px] py-[18px] text-lg font-semibold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none [&>svg]:!h-[32px] [&>svg]:!w-[32px]"
          >
            워케이션
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26 28C26 25.2386 21.299 22.5 15.5 22.5C9.70101 22.5 5 25.2386 5 28H26Z"
                fill="currentColor"
              />
              <rect
                x="11.0586"
                y="14.8926"
                width="1"
                height="9.52579"
                rx="0.5"
                transform="rotate(-16.685 11.0586 14.8926)"
                fill="currentColor"
              />
              <rect
                x="9"
                y="9.28711"
                width="1"
                height="1.49575"
                rx="0.5"
                transform="rotate(-16.685 9 9.28711)"
                fill="currentColor"
              />
              <path
                d="M9.99993 10C5.71814 11.1418 4.57682 15.4072 4.57715 18.7256C4.57727 19.928 5.94396 20.1119 6.48172 19.0364C6.77906 18.4417 7.46842 18.1562 8.09916 18.3664L8.6629 18.5543C9.46624 18.8221 10.3513 18.5607 10.8803 17.8995L11.0813 17.6483C11.6332 16.9584 12.5568 16.6856 13.395 16.965L13.7161 17.0721C14.4662 17.3221 15.2894 17.0176 15.6962 16.3396L15.8126 16.1455C16.2005 15.4991 17.0205 15.2603 17.6947 15.5974C18.797 16.1486 19.8545 15.2013 19.1791 14.1705C17.4694 11.5608 14.288 8.85654 9.99993 10Z"
                fill="currentColor"
              />
              <circle cx="24.5" cy="8" r="3.5" fill="currentColor" />
              <path d="M19.75 8L18.75 8" stroke="currentColor" strokeLinecap="round" />
              <path d="M30 8L29 8" stroke="currentColor" strokeLinecap="round" />
              <path
                d="M21.1046 11.2704L20.3975 11.9775"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path
                d="M28.3526 4.02239L27.6455 4.72949"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path
                d="M21.1046 4.72957L20.3975 4.02246"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path
                d="M28.3526 11.9776L27.6455 11.2705"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path d="M24.375 12.625L24.375 13.625" stroke="currentColor" strokeLinecap="round" />
              <path d="M24.375 2.375L24.375 3.375" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </TabsTrigger>
        </div>
        <button className="h-[44px] w-[115px] rounded-[12px] bg-orange-600 text-base font-semibold text-white">
          모임 만들기
        </button>
      </TabsList>
      <TabsContent value="달램핏">
        <Tabs defaultValue="all" className="w-fit">
          <TabsList className="flex w-full justify-between gap-[8px] bg-transparent">
            <TabsTrigger
              value="all"
              className="h-[40px] w-[57px] rounded-[12px] bg-gray-200 text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
            >
              전체
            </TabsTrigger>
            <TabsTrigger
              value="오피스 스트레칭"
              className="h-[40px] w-fit rounded-[12px] bg-gray-200 px-[15px] text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
            >
              오피스 스트레칭
            </TabsTrigger>
            <TabsTrigger
              value="마인드풀니스"
              className="h-[40px] w-fit rounded-[12px] bg-gray-200 px-[15px] text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
            >
              마인드풀니스
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="워케이션" />
    </Tabs>
  </div>
);

export default GatheringCategory;
