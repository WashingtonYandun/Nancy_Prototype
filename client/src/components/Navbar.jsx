import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
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
        <nav className="flex items-center justify-between bg-dark p-4">
            <h1 className="text-2xl text-bright">
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

            <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <div className="text-bright">Hi! {user.username}</div>
                        <div>
                            <ButtonLink
                                to={
                                    isAuthenticated
                                        ? user.role === "admin"
                                            ? "/admin/users"
                                            : "/notes"
                                        : "/"
                                }
                            >
                                {user.role === "admin"
                                    ? "User Managment"
                                    : "New Session"}
                            </ButtonLink>

                            <ButtonLink
                                to={
                                    isAuthenticated
                                        ? user.role === "admin"
                                            ? "/admin/videos"
                                            : "/dashboard"
                                        : "/"
                                }
                            >
                                {user.role === "admin"
                                    ? "Videos Managment"
                                    : "Dashboard"}
                            </ButtonLink>
                        </div>

                        <div>
                            <Link
                                to="/"
                                onClick={() => logout()}
                                className="text-accent hover:underline"
                            >
                                Logout
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <ButtonLink to="/login">Login</ButtonLink>
                        </div>
                        <div>
                            <ButtonLink to="/register">Register</ButtonLink>
                        </div>
                    </>
                )}
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-bright">
                    ☰
                </button>
            </div>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="md:hidden absolute right-0 top-16 bg-dark p-4 space-y-4"
                >
                    {isAuthenticated ? (
                        <>
                            <div className="text-bright">
                                Hi! {user.username}
                            </div>
                            <div>
                                <ButtonLink
                                    to={
                                        isAuthenticated
                                            ? user.role === "admin"
                                                ? "/admin/users"
                                                : "/notes"
                                            : "/"
                                    }
                                    onClick={closeMenu}
                                >
                                    {user.role === "admin"
                                        ? "User Managment"
                                        : "New Session"}
                                </ButtonLink>

                                <ButtonLink
                                    to={
                                        isAuthenticated
                                            ? user.role === "admin"
                                                ? "/admin/videos"
                                                : "/dashboard"
                                            : "/"
                                    }
                                >
                                    {user.role === "admin"
                                        ? "Videos Managment"
                                        : "Dashboard"}
                                </ButtonLink>
                            </div>
                            <div>
                                <Link
                                    to="/"
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="text-accent hover:underline"
                                >
                                    Logout
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <ButtonLink to="/login" onClick={closeMenu}>
                                    Login
                                </ButtonLink>
                            </div>
                            <div>
                                <ButtonLink to="/register" onClick={closeMenu}>
                                    Register
                                </ButtonLink>
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
