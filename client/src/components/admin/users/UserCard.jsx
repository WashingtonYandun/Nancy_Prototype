import { useUsers } from "../../../context/usersContext";
import { Button, Card } from "../../ui";

export function UserCard({ user }) {
    const { deleteUser } = useUsers();

    return (
        <Card className="p-6 bg-secondary rounded-md shadow-md">
            <header className="flex justify-between mb-4 truncate">
                <h1 className="text-2xl font-bold text-text truncate">
                    {user.username}
                </h1>
            </header>

            <div className="mb-4">
                <p className="text-text truncate">{user.email}</p>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => deleteUser(user._id)}
                    className="bg-error hover:bg-joy"
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
}
