import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref, rows = 2) => (
    <textarea
        {...props}
        ref={ref}
        className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-accent transition duration-300"
        rows={rows}
    />
));
