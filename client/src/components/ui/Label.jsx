export function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="block mb-1 text-text">
            {children}
        </label>
    );
}
