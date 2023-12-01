import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-dark text-bright p-4">
            <div className="container mx-auto text-center">
                <p className="text-sm text-white">
                    © {new Date().getFullYear()} Nancy. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
