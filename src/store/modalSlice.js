import { writable } from "svelte/store";

const create_modal_alert = () => {
	const { set, subscribe } = writable(false);
	const open = (txt) => {
		set(true);
		modal_alert_txt.set(txt);
	};
	const close = () => set(false);
	return { open, close, subscribe };
};

export const modal_alert = create_modal_alert();
export const modal_alert_txt = writable("");
