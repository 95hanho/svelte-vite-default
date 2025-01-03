import { writable } from "svelte/store";
import { cookies } from "../cookies";
import { push } from "svelte-spa-router";
import { testService } from "../api";
import { modal_alert } from "./modalSlice";

const create_login = () => {
	const { subscribe, set } = writable(false);
	let reToken_ing = false;
	let getUser_ing = false;

	const login = (aToken, rToken) => {
		reToken(aToken, rToken);
		set(true);
	};

	const logout = () => {
		cookies.remove("access_token");
		cookies.remove("refresh_token");
		set(false);
		modal_alert.open("로그아웃 되었습니다.");
		push("/");
	};

	const reToken = (aToken, rToken) => {
		cookies.set("access_token", aToken, 60 * 5);
		cookies.set("refresh_token", rToken, 60 * 15);
	};

	const tokenCheck = async () => {
		let aToken = cookies.get("access_token");
		const rToken = cookies.get("refresh_token");
		if (!rToken) logout();
		else if (!aToken && rToken) {
			if (!reToken_ing) {
				reToken_ing = true;
				await testService.token_refresh({ refresh_token: rToken }).then((data) => {
					console.log("retoken api success");
					reToken(data.access_token, data.refresh_token);
					aToken = data.access_token;
				});
				reToken_ing = false;
			}
		}

		console.log(getUser_ing);
		const unsubscribe = userInfo.subscribe(async (uInfo) => {
			if (!uInfo.name && aToken && !getUser_ing) {
				getUser_ing = true;
				await testService.get_user().then((data) => {
					console.log(data);
					userInfo.set({ ...data.user });
				});
				getUser_ing = false;
			}
		});
		unsubscribe();
		return;
		/*
		const unsubscribe = userInfo.subscribe((uInfo) => {
			console.log(uInfo);
			if (!uInfo.name && aToken && !getUser_ing) {
				// testService.get_user().then((data) => {
				// 	console.log(data);
				// 	userInfo.set({ ...data.user });
				// });
			}
		});
		unsubscribe();
		*/
	};

	return { subscribe, set, login, logout, tokenCheck };
};

export const loginOn = create_login();
export const userInfo = writable({
	name: "",
});
