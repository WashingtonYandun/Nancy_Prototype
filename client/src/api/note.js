import axios from "./axios";

export const getNotesRequest = async () => axios.get("/notes");

export const createNoteRequest = async (note) => axios.post("/notes", note);

export const updateNoteRequest = async (id, note) =>
    axios.put(`/notes/${id}`, note);

export const deleteNoteRequest = async (id) => axios.delete(`/notes/${id}`);

export const getNoteRequest = async (id) => axios.get(`/notes/${id}`);
