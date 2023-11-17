import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

const AuthenticatedLinks = ({ user, logout }) => (
    <>
        <div className="text-bright">Hi! {user.username}</div>
        {user.role === "admin" ? (
            <>
                <ButtonLink to="/admin/users">User Management</ButtonLink>
                <ButtonLink to="/admin/add-video">Add Video</ButtonLink>
            </>
        ) : (
            <>
                <ButtonLink to="/notes/add-note">Notes</ButtonLink>
                <ButtonLink to="/dashboard">Dashboard</ButtonLink>
            </>
        )}
        <Link
            to="/"
            onClick={() => {
                logout();
            }}
            className="text-accent hover:underline"
        >
            Logout
        </Link>
    </>
);

const GuestLinks = () => (
    <>
        <ButtonLink to="/login">Login</ButtonLink>
        <ButtonLink to="/register">Register</ButtonLink>
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
                    <AuthenticatedLinks user={user} logout={logout} />
                ) : (
                    <GuestLinks />
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
                        <AuthenticatedLinks user={user} logout={logout} />
                    ) : (
                        <GuestLinks />
                    )}
                </div>
            )}
        </nav>
    );
};
