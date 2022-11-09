# 자유게시판 만들기 프로젝트

- 순수 Vanila JavaScript 공부 프로젝트
- HTML, CSS, JS
- 사용 DB : MySQL 8.0
- 서버 : Express.js(Node.js 서버)

구현 기능

- 게시글 작성
  -> 유효성 검사
- 게시글 수정, 삭제
- 댓글 작성, 수정, 삭제
  -> 수정 기능 미흡(로그인 미구현으로 인함)
- 작성자 이름으로 게시물 검색
- Pagination 기능
- 조회수, 추천 기능
  -> 로그인 기능 미구현으로 추천 버튼 누르면 추천이 계속 올라가는 문제
- 태그별 게시글 검색
- 한 페이지에 볼 수 있는 글 개수 설정 가능
- 로그인 기능 구현

  - mysql에 USER테이블 생성하여 유저 아이디 정보 저장
  - session 이용하여 ID, PW 주고 받음 -> 동작 없을 시 10분마다 자동 로그인 해제
    //TODO : 비밀번호 해시 기능 추가 필요

- 게시글 작성 시 에디터는 네이버 스마트 에디터 3.0이 오픈소스 공개되어있지 않고, 이전 버전은 오류가 있어서 추후 부트스트랩 혹은 react 사용 시 구현

구현 예정

- 로그인 api 활용
  -> 추천, 댓글 수정 보완
- 댓글 유효성 검사
- SNB 구현하여 여러 게시판 구현(?)

리팩토링 예정

- Single Page Application
- fetch api 대신 axios(node.js fetch상위 호환 패키지)

![제목 없음](https://user-images.githubusercontent.com/65962363/200174919-a9e8c1aa-cc2c-440f-bd4f-bfcfa261e12d.png)
![로그인 호마ㅕㄴ](https://user-images.githubusercontent.com/65962363/200895394-301a3b3e-268e-4449-aefb-4d47b28bc028.png)


2022-11-05

- JSON-SERVER로 MOCK 데이터 받는 구조에서 express.js 서버 형식으로 변경
