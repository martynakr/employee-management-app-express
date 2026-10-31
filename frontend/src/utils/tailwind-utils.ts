import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            spacing: ["padding", "section", "section-lg"],
            text: ["heading", "body"],
        },
    },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
