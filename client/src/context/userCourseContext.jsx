import { createContext, useContext, useState } from "react";
import { createUserCourseRequest } from "../api/userCourse.js";

const UserCourseContext = createContext();

export const useUserCourse = () => {
    const context = useContext(UserCourseContext);
    if (!context)
        throw new Error(
            "useUserCourse must be used within a UserCourseProvider"
        );
    return context;
};

export function UserCourseProvider({ children }) {
    const createUserCourse = async (data) => {
        try {
            const res = await createUserCourseRequest(data);
            console.log(res.data);
        } catch (error) {
            console.error(error);
            console.log(error.response);
        }
    };

    return (
        <UserCourseContext.Provider
            value={{
                createUserCourse: createUserCourse,
            }}
        >
            {children}
        </UserCourseContext.Provider>
    );
}
