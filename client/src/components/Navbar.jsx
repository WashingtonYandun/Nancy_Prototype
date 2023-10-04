import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    console.log(isAuthenticated, user);

    return (
        <nav className="w-full bg-[#4f772d] mb-5 flex justify-between py-5 px-10 ">
            <h1 className="text-2xl font-bold">
                <Link to={isAuthenticated ? "/notes" : "/"}>Nancy</Link>
            </h1>

            <ul className="flex gap-x-3">
                {isAuthenticated ? (
                    <>
                        <li>Hi! {user.username}</li>
                        <li>
                            <ButtonLink to="/add-note">Add Session</ButtonLink>
                        </li>
                        <li>
                            <Link to="/" onClick={() => logout()}>
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
            </ul>
        </nav>
    );
}
