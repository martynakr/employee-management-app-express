import type { ReactNode } from "react";
import { cn } from "../../utils/tailwind-utils";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    as?: "div" | "article" | "section";
    interactive?: boolean;
}

const Card = ({
    children,
    as: Component = "div",
    interactive = false,
    className,
    ...props
}: CardProps) => {
    return (
        <Component
            className={cn(
                "rounded-xl border border-border bg-surface p-6 shadow-sm",
                interactive &&
                    "transition-all duration-200 hover:border-primary/40 hover:shadow-md",
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
