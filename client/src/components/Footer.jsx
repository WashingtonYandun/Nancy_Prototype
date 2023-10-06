import React from "react";

function Footer() {
    return (
        <footer className="bg-dark text-bright p-4">
            <div className="container mx-auto text-center">
                <p className="text-sm text-white">
                    © {new Date().getFullYear()} Nancy. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
