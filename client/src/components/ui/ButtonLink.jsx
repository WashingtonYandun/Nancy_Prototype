import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
    <Link
        to={to}
        className="inline-block bg-accent text-white border-2 border-accent px-4 py-2 rounded-md transition duration-300 hover:bg-joy hover:border-joy"
    >
        {children}
    </Link>
);
