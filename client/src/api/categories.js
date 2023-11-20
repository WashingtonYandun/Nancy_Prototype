import { wy_apis } from "./axios";

export const getWyCategories = async () => wy_apis.get("/categories");
