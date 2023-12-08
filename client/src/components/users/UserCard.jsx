import { useUsers } from "../../context/usersContext";
import { Card } from "../ui";

export function UserCard({ user }) {
    const { deleteUser, makeAdmin } = useUsers();

    return (
        <Card className="p-6 bg-secondary rounded-md shadow-md">
            <header className="flex justify-between mb-4 truncate">
                <h1 className="text-2xl font-bold text-text truncate">
                    {user.username}
                </h1>
                <h3>{user.role}</h3>
            </header>

            <div className="mb-4">
                <p className="text-text truncate">{user.email}</p>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-error hover:bg-joy"
                >
                    Delete
                </button>

                <button
                    onClick={() => makeAdmin(user._id)}
                    className="bg-error hover:bg-joy"
                >
                    Make Admin
                </button>
            </div>
        </Card>
    );
}
