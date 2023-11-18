import axios from "axios";
import { API_URL, WY_APIS } from "../config";

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default instance;
