import { createContext, useContext, useState } from "react";
import {
    getUsersRequest,
    deleteUserRequest,
    getUserRequest,
    updateUserRequest,
} from "../api/users";

const UsersContext = createContext();

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }

    return context;
};

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await getUsersRequest();
        setUsers(res.data);
    };

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            if (res.status === 204)
                setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async (id, note) => {
        try {
            await updateUserRequest(id, note);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UsersContext.Provider
            value={{
                users: users,
                getUsers: getUsers,
                deleteUser: deleteUser,
                getUser: getUser,
                updateUser: updateUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
}
