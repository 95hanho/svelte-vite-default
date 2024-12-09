// 요청 Method별 빠른 처리하기 위한
import instance from "./axiosInstance";

export const get_normal = (url, json, headers) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return instance.get(url + queryString, {
		headers,
	});
};

// download
export const get_download = (url, json, headers) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return instance.get(url + queryString, {
		headers,
		responseType: "blob",
	});
};

// post body
export const post_json = (url, params, headers) => {
	return instance.post(url, params, {
		headers,
	});
};

// post formData
export const post_formData = (url, params, headers) => {
	const formData = new FormData();
	Object.entries(params).map((v) => {
		if (v[1] instanceof Array || v[1] instanceof FileList) {
			for (let value of v[1]) {
				formData.append(v[0], value);
			}
		} else {
			formData.append(v[0], v[1]);
		}
	});
	return instance.post(url, formData, {
		headers,
	});
};

// post urlFormData
export const post_urlFormData = (url, params, headers) => {
	const url_form_data = new URLSearchParams();
	Object.entries(params).map((v) => {
		if (v[1] instanceof Array) {
			for (let value of v[1]) {
				url_form_data.append(v[0], value);
			}
		} else {
			url_form_data.append(v[0], v[1]);
		}
	});
	return instance.post(url, url_form_data, {
		headers,
	});
};

// put urlFormData
export const put_urlFormData = (url, params, headers) => {
	const url_form_data = new URLSearchParams(params);
	return instance.put(url, url_form_data, {
		headers,
	});
};

// delete
export const delete_normal = (url, json) => {
	url = url.replace(/ /gi, "%20");
	let queryString = "";
	if (json && Object.entries(json).length > 0) {
		queryString += "?";
		for (let key in json) {
			if (queryString.indexOf("?") !== queryString.length - 1) {
				queryString += "&";
			}
			queryString += `${key}=${json[key]}`;
		}
	}
	return instance.delete(url + queryString);
};
