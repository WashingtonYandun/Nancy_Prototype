import { useEffect } from "react";
import { useUsers } from "../../context/usersContext";
import { Navbar } from "../../components/general/Navbar";
import { Footer } from "../../components/general/Footer";
import { UserCard } from "../../components/users/UserCard";

export function UsersPage() {
    const { users, getUsers } = useUsers();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-8 px-4 min-h-screen">
                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                        <h2 className="font-bold text-xl text-center mt-4">
                            No users yet
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <UserCard user={user} key={user._id} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
