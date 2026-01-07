# 같이달림 Trun
![1](https://github.com/user-attachments/assets/4c7df759-30a7-4fa7-b370-e6db232c68bf)

- 배포 링크 : https://trun-project.vercel.app/
- 기획서 : https://codeit.notion.site/fd8eae01cd8e41e39d01c81c3a942814
- 피그마 : https://www.figma.com/design/mBZtM6dXRb9xL6FnG08Uu0/-KDT-%EB%8B%A8%EA%B8%B0-%EC%8B%AC%ED%99%94--%EA%B0%99%EC%9D%B4%EB%8B%AC%EB%9E%A8?node-id=16763-24401&p=f&t=h6fc2vYIySlreywE-0
  (디자인 시안 2 참고)
- API 명세서 : https://fe-adv-project-together-dallaem.vercel.app/

## 목차

1. 프로젝트 개요 <br/>
   1-1. 프로젝트 기획 <br/>
   1-2. 프로젝트 목표 <br/>
   1-3. 팀 내 협업 방법 <br/>
2. 팀 구성 및 역할 <br/>
3. 프로젝트 수행절차 및 구조 <br/>
   3-1. 프론트엔드 개발 수행절차 <br/>
   3-2. 아키텍쳐 다이어그램 <br/>
   3-3. 프로젝트 구조 <br/>
4. 인가 페이지에 대한 정보 <br/>
5. 트러블 슈팅 <br/>
   5-1. 트러블 슈팅 1 : NextAuth 마이그레이션 <br/>
   5-2. 트러블 슈팅 2 : 인증 보안 강화 및 API 통신 구조 개선 <br/>
   5-3. 트러블 슈팅 3 : Layout Shift <br/>
   
<br/>

## 1. 프로젝트 개요
### 1-1. 프로젝트 기획
![4](https://github.com/user-attachments/assets/3dcc3f03-50e6-48a7-992c-f180cf79a789)
### 1-2. 프로젝트 목표
![5](https://github.com/user-attachments/assets/69866bc3-cd03-4c77-8f8d-adf5de552bc4)
### 1-3. 팀 내 협업 방법
![6](https://github.com/user-attachments/assets/95de5d89-fb8f-485a-90ee-c78c29d37b70)

> **네이밍 컨벤션** 
> - 폴더명 : 케밥(account-edit)
> - 컴포넌트 이름 : 파스칼 (NotificationItem)
> - 자바스크립트 : 카멜(notificationItem)
> - 타입이 배열인데 원시타입을 담고 있으면=> 어쩌구s / ex) months
> - 타입이 객체면=> ㅇㅇㅇItem / ex) cashItem, newItem, editItem
> - 원시타입이면=> 걍 짧은 단어로 / ex) date, price, content 등등
> - 불린타입이면=> is어쩌구 / ex) isLoggedIn, isActive
> - 온클릭, 온서밑 같은거면=> handle 어쩌구로 /
>   ex) handleBackBtn, handleContentChange, handleMeetupFormSubmit
> - 함수=> 행동+ 명사로 ex) getStudentName, getMonth, updateProfile
> - 컴포넌트=> 명사+명사로 (파스칼 케이스) / ex) LoginForm, ProductList, UserProfileCard
> - 예약어 사용하지 않는다.
> - 함수는 화살표 함수로 통일한다. ⇒ this바인딩 , 최신문법 적용
> - 배열은 복수형으로 한다 (ad → ads)
> - 상수는 대문자 + \_ : 어퍼케이스 (const THIS_IS_CONSTANT = 'string')
> - 동적으로 변할 가능성이 있는 값인데 const키워드를 사용한다면 카멜케이스
> - 하지만 화살표 함수는 const를 사용하지만 카멜케이스
> - 객체/배열은 리터럴을 사용한다.
> - 풀네임 지향 (줄임말x)
>   e → event
> - 큰따옴표를 사용한다. (프리티어에 적용할 예정)

✚ 추가 협업 방법
 - type 사용 하기
  - interface가 할 수 있는 것 모두를 할 수 있음
  - interface는 type 중 할 수 없는게 있음 ex) 유니온, 튜플
  - 컴파일 시점에 interface, type 모두 사라진다. => 런타임엔 남지 않는다. (추가로 알아본 정보)
  - type으로 설정해 둔것은 사용했을 때 호버하면 값을 바로 볼 수 있다. (생산성 증가)
    
<br/>

## 2. 팀 구성 및 역할
- 이보영 : https://github.com/osoon9295
- 오민택 : https://github.com/mintaek61
- 이형탁 : https://github.com/htak0601
  
![8](https://github.com/user-attachments/assets/f90ab867-3a07-4c73-84d7-8aee42e666fb)

<br/>

## 3. 프로젝트 수행절차 및 구조

### 3-1. 프론트엔드 개발 수행절차

![10](https://github.com/user-attachments/assets/dbcc963f-9b79-4f5f-b887-37fdbab6dffb)
![11](https://github.com/user-attachments/assets/e5278919-2bed-4a97-8282-9af0506c2af5)

### 3-2. 아키텍쳐 다이어그램
![12](https://github.com/user-attachments/assets/4c24eb07-d5ed-43e0-81e4-4aa3e5dd74ed)

### 3-3. 프로젝트 구조
![13](https://github.com/user-attachments/assets/7c8cd69e-0e8f-4b02-878d-071aef251c7b)

<br/>

## 4. 인가 페이지에 대한 정보
|                             | 보호 페이지                                            | 보호X 페이지                            | 보호X 페이지 & 보호 기능                                                       |
| --------------------------- | ------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| 위치                        | my-page, moim-favorite                                 | main, moim-find,all-review, moim-detail | moim-detail(모임취소, 모임삭제, 모임신청, 찜하기), moim-find(모임 생성,찜하기) |
| 로그아웃 시                 | 로그아웃 토스트 & 로그인 페이지 이동                   | 로그아웃 토스트 & 로그인 페이지 이동    | 로그아웃 토스트 & 로그인 페이지 이동                                           |
| 토큰 만료 시                | 로그인 유도 모달(세션만료) => 취소->메인, 확인->로그인 | 접근 가능                               | 로그인 유도 모달(세션만료) => 취소->그대로 , 확인->로그인                      |
| 로그인 안 할 때 - 정상 접근 | 로그인 유도 모달(서비스) => 취소->그대로, 확인->로그인 | 접근 가능                               | 로그인 유도 모달(서비스) => 취소->그대로 , 확인->로그인                        |
| 로그인 안 할 때 - url 접근  | 로그인 페이지 리다이렉트                               | 접근 가능                               | X                                                                              |
<br/>

## 5. 트러블 슈팅

### 5-1. 트러블 슈팅 1 : NextAuth 마이그레이션
![17](https://github.com/user-attachments/assets/574c9a57-e9bd-43ca-9454-b2ce210d6414)
![18](https://github.com/user-attachments/assets/c643eb05-4159-48e4-abd9-afbc27eb14d3)
![19](https://github.com/user-attachments/assets/c96a7173-252a-4c65-978e-d0f7c7f2fcdd)
![20](https://github.com/user-attachments/assets/37ef5514-6f0f-4489-af4e-0302de343362)

### 5-2. 트러블 슈팅 2 : 인증 보안 강화 및 API 통신 구조 개선

![21](https://github.com/user-attachments/assets/606a62a9-dd40-48c2-bd9a-c6b23aef54d5)
![22](https://github.com/user-attachments/assets/69a04edf-2971-4152-978f-b3664d09a354)
![23](https://github.com/user-attachments/assets/b9b12de2-7d0f-496c-8751-be89c23a5da4)

### 5-3. 트러블 슈팅 3 : Layout Shift
![24](https://github.com/user-attachments/assets/e5933eb2-8de2-4d39-bc2f-f717ca31d1fb)
![25](https://github.com/user-attachments/assets/1d523efd-f091-4ae2-9d7a-1d13e66db873)
![26](https://github.com/user-attachments/assets/aedba049-70ba-4138-88a6-c39bb46ed13e)

