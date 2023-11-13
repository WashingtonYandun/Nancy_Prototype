import { useEffect } from "react";
import { useUsers } from "../../context/usersContext";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

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
                            No users found, please wait
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                                <h2 className="font-bold text-xl text-center mt-4">
                                    {user.email}
                                </h2>
                                <h2 className="font-bold text-xl text-center mt-4">
                                    {user.role}
                                </h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
