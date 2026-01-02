## 인증, 인가

|                             | 보호 페이지                                            | 보호X 페이지                            | 보호X 페이지 & 보호 기능                                                       |
| --------------------------- | ------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| 위치                        | my-page, moim-favorite                                 | main, moim-find,all-review, moim-detail | moim-detail(모임취소, 모임삭제, 모임신청, 찜하기), moim-find(모임 생성,찜하기) |
| 로그아웃 시                 | 로그아웃 토스트 & 로그인 페이지 이동                   | 로그아웃 토스트 & 로그인 페이지 이동    | 로그아웃 토스트 & 로그인 페이지 이동                                           |
| 토큰 만료 시                | 로그인 유도 모달(세션만료) => 취소->메인, 확인->로그인 | 접근 가능                               | 로그인 유도 모달(세션만료) => 취소->그대로 , 확인->로그인                      |
| 로그인 안 할 때 - 정상 접근 | 로그인 유도 모달(서비스) => 취소->그대로, 확인->로그인 | 접근 가능                               | 로그인 유도 모달(서비스) => 취소->그대로 , 확인->로그인                        |
| 로그인 안 할 때 - url 접근  | 로그인 페이지 리다이렉트                               | 접근 가능                               | X                                                                              |

### interface 와 type

- type 사용 하기
  - interface가 할 수 있는 것 모두를 할 수 있음
  - interface는 type 중 할 수 없는게 있음 ex) 유니온, 튜플
  - 컴파일 시점에 interface, type 모두 사라진다. => 런타임엔 남지 않는다. (추가로 알아본 정보)
  - type으로 설정해 둔것은 사용했을 때 호버하면 값을 바로 볼 수 있다. (생산성 증가)

### 함수이름

- 폴더명 : 케밥(account-edit)
- 컴포넌트 이름 : 파스칼 (NotificationItem)
- 자바스크립트 : 카멜(notificationItem)

- 타입이 배열인데 원시타입을 담고 있으면=> 어쩌구s / ex) months
- 타입이 객체면=> ㅇㅇㅇItem / ex) cashItem, newItem, editItem
- 원시타입이면=> 걍 짧은 단어로 / ex) date, price, content 등등
- 불린타입이면=> is어쩌구 / ex) isLoggedIn, isActive
- 온클릭, 온서밑 같은거면=> handle 어쩌구로 /
  ex) handleBackBtn, handleContentChange, handleMeetupFormSubmit
- 함수=> 행동+ 명사로 ex) getStudentName, getMonth, updateProfile
- 컴포넌트=> 명사+명사로 (파스칼 케이스) / ex) LoginForm, ProductList, UserProfileCard

- 예약어 사용하지 않는다.
- 함수는 화살표 함수로 통일한다. ⇒ this바인딩 , 최신문법 적용
- 배열은 복수형으로 한다 (ad → ads)
- 상수는 대문자 + \_ : 어퍼케이스 (const THIS_IS_CONSTANT = 'string')
- 동적으로 변할 가능성이 있는 값인데 const키워드를 사용한다면 카멜케이스
- 하지만 화살표 함수는 const를 사용하지만 카멜케이스
- 객체/배열은 리터럴을 사용한다.
- 풀네임 지향 (줄임말x)
  e → event
- 큰따옴표를 사용한다. (프리티어에 적용할 예정)
