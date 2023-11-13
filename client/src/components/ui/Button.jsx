export function Button({ onClick, children }) {
    return (
        <button
            className="bg-accent hover:bg-joy text-white font-bold py-2 px-4 w-full transition duration-300"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
