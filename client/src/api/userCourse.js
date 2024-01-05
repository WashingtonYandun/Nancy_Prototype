import axios from "./axios";

export const createUserCourseRequest = async (data) => axios.post("/usercourse", data);
