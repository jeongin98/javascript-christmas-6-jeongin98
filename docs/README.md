# 🎯 구현 조건

- [ ] 함수(또는 메서드)의 길이가 15라인을 넘어가지 않도록 구현한다 - 함수는 한 가지 일을 하도록 기능을 쪼갠다

- [ ] indent depth가 3이 넘지 않도록 구현한다. 2까지만 허용한다

- [ ] 기능단위로 커밋한다

- [ ] Jest를 이용하여 기능 목록이 정상 동작함을 테스트 코드로 확인한다 - 도메인 로직에 단위 테스트를 구현한다

- [ ] else를 지양한다

- [ ] 사용자가 잘못된 값을 입력할 경우 throw문을 사용해 예외를 발생시킨다. 그런 다음, "[ERROR]"로 시작하는 에러 메시지를 출력하고 해당 부분부터 입력을 다시 받는다.

# 🚀 기능 목록

# Domain

### EventService

> Event 클래스와 menu 객체를 매니징하는 클래스

- [ ] 멤버 필드
  - event
- [ ] Event 클래스를 이용해 이벤트를 실행한 뒤, 이벤트 결과를 반환

### Event

> 이벤트/할인을 진행하는 클래스

- [ ] 멤버 필드
  - date
  - orderList
  - eventResult
- [ ] 이벤트 시작
- [ ] 할인 가능 여부 확인
- [ ] 할인 진행
  - [ ] 평일 할인
  - [ ] 주말 할인
  - [ ] 특별 할인
  - [ ] 크리스마스 할인
- [ ] 증정 이벤트 진행

### menu

> 메뉴 정보를 저장

- [ ] 멤버 필드
  - 애피타이저, 메인, 디저트, 음료 등의 메뉴 정보

# View

### View

> InputView, OutputView 객체를 매니징하는 클래스

- [ ] 멤버 필드
  - inputView
  - outputView
- [ ] 날짜 입력받은 후 반환(InputView)
- [ ] 주문 정보 입력받은 후 반환(InputView)
- [ ] 이벤트 결과 출력(OutputView)

### InputView

> 입력을 담당하는 객체

- [x] 날짜 입력받은 후 반환
- [ ] 주문 정보 입력받은 후 반환

  - validation.js 를 이용해 입력값 유효성 검사 진행

### OutputView

> 출력을 담당하는 객체

- [ ] 이벤트 결과 출력

# Controller

### ChristmasPromotionController

> 이벤트를 진행하는 컨트롤러로 Model(EventService)과 View(View)로 명령을 전달하는 클래스

- [ ] 멤버 필드
  - eventService
  - view
- [ ] 사용자 입력 받아 이벤트 실행

# utils

### validation

> InputView의 입력에 대한 유효성 검사

- [ ] 날짜 입력 유효성 검사
- [ ] 주문 정보 입력 유효성 검사
  - [ ] 주문 정보를 정제한 뒤 반환하는 함수 이용

### messages

> 입력, 출력, 에러와 관련된 메세지를 상수화하여 저장
