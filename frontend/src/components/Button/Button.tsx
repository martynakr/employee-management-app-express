import type { ReactNode } from "react";
import { cn } from "../../utils/tailwind-utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-primary text-white shadow-sm hover:bg-navy hover:shadow-md active:scale-[0.98]",

        secondary:
            "bg-surface text-primary border border-border hover:bg-background hover:border-primary active:scale-[0.98]",
    };
    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
