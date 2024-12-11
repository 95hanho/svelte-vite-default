import { get_download, get_normal, post_formData, post_urlFormData } from "../apiFilter";
import API_URL from "../endpoints";

const testService_doc = {
	test: async () => await get_normal(API_URL.TEST),
	login: async (obj) => await post_urlFormData(API_URL.TESTLOGIN, obj),
	token_refresh: async (obj) => await post_urlFormData(API_URL.TESTTOKEN, obj),
	get_user: async () => await get_normal(API_URL.TESTUSER),
	file_upload: async (obj) => await post_formData(API_URL.TEST_FILEUPLOAD, obj),
	file_download: async () => await get_download(API_URL.TEST_FILEDOWNLOAD),
	get_myfileName: async () => await get_normal(API_URL.TEST_MYFILE),
};

export default testService_doc;
