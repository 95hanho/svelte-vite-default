// Axios 인스턴스 생성 및 설정
import axios from "axios";
import { cookies } from "../cookies";
import API_URL from "./endpoints";
import { loginOn } from "../store/authSlice";
import { modal_alert } from "../store/modalSlice";

const instance = axios.create({
	baseURL: "",
	timeout: 5000,
});
// 토큰체크 안하는 url
const notTokenCheckUrl = [API_URL.TESTLOGIN, API_URL.TESTTOKEN, API_URL.TESTUSER];

instance.interceptors.request.use(
	async (res) => {
		// console.log(res.url);

		if (!notTokenCheckUrl.includes(res.url)) {
			await loginOn.tokenCheck();
		}
		// reToken될 떄는 솔직히 aToken검사할 필요 없음. 어차피 새로 저장될꺼니까!
		const aToken = cookies.get("access_token");
		if (aToken) res.headers["access_token"] = aToken;

		return res;
	},
	(err) => {
		return Promise.reject(err.response);
	}
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		console.log(err);
		if (err.status == 401) {
			modal_alert.open("잘 못 된 인증정보 입니다.");
			loginOn.logout();
		}
		return Promise.reject(err.response.data);
	}
);

export default instance;
