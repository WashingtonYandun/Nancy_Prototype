import { createContext, useContext, useState } from "react";
import {
    getUsersRequest,
    deleteUserRequest,
    getUserRequest,
    updateUserRequest,
    makeAdminRequest,
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

        const nonAdminUsers = res.data.filter((user) => user.role !== "admin");

        setUsers(nonAdminUsers);
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

    const updateUser = async (id, user) => {
        try {
            await updateUserRequest(id, user);
        } catch (error) {
            console.error(error);
        }
    };

    const makeAdmin = async (id) => {
        try {
            await makeAdminRequest(id);
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
                makeAdmin: makeAdmin,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
}
