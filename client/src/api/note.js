import { nancy_apis, wy_apis } from "./axios";

export const getNotesRequest = async () => nancy_apis.get("/notes");

export const createNoteRequest = async (note) =>
    nancy_apis.post("/notes", note);

export const updateNoteRequest = async (id, note) =>
    nancy_apis.put(`/notes/${id}`, note);

export const deleteNoteRequest = async (id) =>
    nancy_apis.delete(`/notes/${id}`);

export const getNoteRequest = async (id) => nancy_apis.get(`/notes/${id}`);
