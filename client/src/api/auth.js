import { nancy_apis, wy_apis } from "./axios";

export const registerRequest = async (user) =>
    nancy_apis.post(`/auth/register`, user);

export const loginRequest = async (user) =>
    nancy_apis.post(`/auth/login`, user);

export const verifyTokenRequest = async () => nancy_apis.get(`/auth/verify`);
