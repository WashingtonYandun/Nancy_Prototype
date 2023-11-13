import axios from "./axios";

export const getUsersRequest = async () => axios.get("/admin/users");

export const updateUserRequest = async (id, note) =>
    axios.put(`/admin/users/${id}`, user);

export const deleteUserRequest = async (id) =>
    axios.delete(`/admin/users/${id}`);

export const getUserRequest = async (id) => axios.get(`/admin/users/${id}`);
