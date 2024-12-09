// Axios 인스턴스 생성 및 설정
import axios from "axios";

const instance = axios.create({
	baseURL: "",
	timeout: 5000,
});

instance.interceptors.request.use(
	async (res) => {
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
		return Promise.reject(err.response);
	}
);

export default instance;
