### interface 와 type

- interface : 대부분 사용

- type : 유니온 타입에 사용, 원시타입

```
type Status = 'pending' | 'approved' | 'rejected'

type UserId = string
```

### 화살표 함수 사용 지향

const

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
