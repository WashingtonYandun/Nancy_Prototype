import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="flex items-center justify-between bg-dark p-4">
            <h1 className="text-2xl text-bright">
                <Link to={isAuthenticated ? "/notes" : "/"}>Nancy</Link>
            </h1>

            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <li className="text-bright">Hi! {user.username}</li>
                        <li>
                            <ButtonLink to="/add-note">Add Session</ButtonLink>
                        </li>
                        <li>
                            <Link
                                to="/"
                                onClick={() => logout()}
                                className="text-accent hover:underline"
                            >
                                Logout
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <ButtonLink to="/login">Login</ButtonLink>
                        </li>

                        <li>
                            <ButtonLink to="/register">Register</ButtonLink>
                        </li>
                    </>
                )}
            </div>
        </nav>
    );
}
