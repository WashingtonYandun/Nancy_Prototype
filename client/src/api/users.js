import { nancy_apis, wy_apis } from "./axios";

export const getUsersRequest = async () => nancy_apis.get("/admin/users");

export const updateUserRequest = async (id, user) =>
    nancy_apis.put(`/admin/users/${id}`, user);

export const deleteUserRequest = async (id) =>
    nancy_apis.delete(`/admin/users/${id}`);

export const getUserRequest = async (id) =>
    nancy_apis.get(`/admin/users/${id}`);

export const makeAdminRequest = async (id) =>
    nancy_apis.put(`/admin/users/${id}/make-admin`);
