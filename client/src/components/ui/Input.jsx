import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
    <input
        {...props}
        ref={ref}
        className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-accent transition duration-300"
    />
));
