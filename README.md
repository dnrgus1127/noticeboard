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

- 회원 가입 페이지 구현 (2022-11-16)

  - ID(6~12자, 스크립트문자, 공백), PW 유효성(패스워드 6자 이상, 영문,한글,특수문자 각 1개 이상 포함 ,스크립트문자, 공백) 검사 기능
  - 중복된 ID 검사
    -> 회원 가입 하단 help 텍스트 링크 기능 추가 필요

- 게시글 작성 시 에디터는 네이버 스마트 에디터 3.0이 오픈소스 공개되어있지 않고, 이전 버전은 오류가 있어서 추후 부트스트랩 혹은 react 사용 시 구현

구현 예정

- 로그인 api 활용
  -> 추천, 댓글 수정 보완
- 댓글 유효성 검사
- SNB 구현하여 여러 게시판 구현(?)

리팩토링 예정

- Single Page Application
- fetch api 대신 axios(node.js fetch상위 호환 패키지)
- ![로그인 호마ㅕㄴ](https://user-images.githubusercontent.com/65962363/201859329-0f654030-a6b6-4579-b784-94f1c813d995.png)

![메인 화면](https://user-images.githubusercontent.com/65962363/201858697-1239e5a0-481e-4b50-baaf-b3b475f940ed.png)
![게시글](https://user-images.githubusercontent.com/65962363/201859113-e94a5ac4-b57f-4c29-9bf7-0125a6ba1dfa.png) -회원 가입 페이지
![회원 가입 화면](https://user-images.githubusercontent.com/65962363/201969897-08da7a9a-638b-4923-bbda-1e8ffc9e5a04.png)

2022-11-05

- JSON-SERVER로 MOCK 데이터 받는 구조에서 express.js 서버 형식으로 변경
