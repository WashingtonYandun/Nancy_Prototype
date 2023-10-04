export function Button({ onClick, children }) {
    return (
        <button
            className=" flex justify-center w-full border-2 px-4 py-1 rounded-md my-2 "
            onClick={onClick}
        >
            {children}
        </button>
    );
}
