import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
    <Link to={to} className="border-2 px-4 py-1 rounded-md">
        {children}
    </Link>
);
