// API 엔드포인트 목록 - API url 모음집
// const API_ENDPOINTS = {
const API_URL = {
  // 테스트
  TEST: "http://ehfqntuqntu.cafe24.com", // GET
  TESTLOGIN: "http://ehfqntuqntu.cafe24.com/auth/login", // 로그인
  TESTTOKEN: "http://ehfqntuqntu.cafe24.com/auth/token", // 토큰
  TESTUSER: "http://ehfqntuqntu.cafe24.com/auth", // 유저 정보
  TEST_FILEUPLOAD: "http://ehfqntuqntu.cafe24.com/file", // 파일업로그
  TEST_FILEDOWNLOAD: "http://ehfqntuqntu.cafe24.com/file", // 파일다운로드
  TEST_MYFILE: "http://ehfqntuqntu.cafe24.com/file/myfile", // 내 파일이름가져오기
  /* 인증 */
  LOGIN: "", // 로그인
  LOGOUT: "", // 로그아웃
  TOKEN: "" // 토큰 리토큰, 정보가져오기
};

export default API_URL;
