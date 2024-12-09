import { get_normal } from "../apiDOC";
import API_ENDPOINTS from "../endpoints";

export const test = async () => (await get_normal(API_ENDPOINTS.TEST)).data;
