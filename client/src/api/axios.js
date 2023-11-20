import axios from "axios";
import { API_URL, WY_APIS } from "../config";

export const nancy_apis = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const wy_apis = axios.create({
    baseURL: WY_APIS,
    withCredentials: true,
});
