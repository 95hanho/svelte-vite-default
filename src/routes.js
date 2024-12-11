import wrap from "svelte-spa-router/wrap";
import Main from "./routes/Main.svelte";
import Test from "./routes/Test.svelte";
import { loginOn } from "./store/authSlice";
import { push, replace } from "svelte-spa-router";
import { modal_alert } from "./store/modalSlice";

// 로그인 페이지에 토큰체크 & 헤더네임가져오기
const loginUrlCheck = async (component) => {
	let result = true;
	const check = loginOn.subscribe(async (on) => {
		if (on) {
			console.log("router tokenCheck");
			await loginOn.tokenCheck();
		} else {
			modal_alert.open("로그인이 필요한 페이지입니다.");
			result = false;
		}
	});

	check();
	if (!result) {
		replace("/");
		return false;
	}
	return component;
};

const routes = {
	"/": wrap({
		component: Main,
	}),
	"/test": wrap({
		async asyncComponent() {
			return loginUrlCheck(Test);
		},
	}),
};

export default routes;
