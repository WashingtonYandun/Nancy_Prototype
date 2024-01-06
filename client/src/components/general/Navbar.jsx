import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AuthenticatedLinks = ({ user, logout }) => (
    <>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
            {user.role === "admin" ? (
                <>
                    <Link to="/admin/users" className="btn-primary">
                        User Management
                    </Link>
                    <Link to="/admin/videos/add-video" className="btn-primary">
                        Add Video
                    </Link>
                    <Link to="/courses/add-course" className="btn-primary">
                        Add Course
                    </Link>
                    <Link to="/courses/" className="btn-primary">
                        Courses
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/courses" className="btn-primary">
                        Courses
                    </Link>
                    <Link to="/recomendations" className="btn-primary">
                        Explore
                    </Link>
                </>
            )}
            <Link
                to="/"
                onClick={() => {
                    logout();
                }}
                className="btn-secondary"
            >
                Logout
            </Link>
        </div>
    </>
);

const GuestLinks = () => (
    <>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/login" className="btn-primary">
                Login
            </Link>
            <Link to="/register" className="btn-primary">
                Register
            </Link>
        </div>
    </>
);

export const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    return (
        <nav className="bg-teal-50 border-b-2 text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link
                        to={
                            isAuthenticated
                                ? user.role === "admin"
                                    ? "/admin/users"
                                    : "/notes"
                                : "/"
                        }
                    >
                        Nancy
                    </Link>
                </h1>

                <div className="hidden md:block">
                    {isAuthenticated ? (
                        <AuthenticatedLinks user={user} logout={logout} />
                    ) : (
                        <GuestLinks />
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-xl">
                        ☰
                    </button>
                </div>
            </div>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                >
                    {isAuthenticated ? (
                        <AuthenticatedLinks user={user} logout={logout} />
                    ) : (
                        <GuestLinks />
                    )}
                </div>
            )}
        </nav>
    );
};
