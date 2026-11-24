import type { ReactNode } from "react";
import { cn } from "../../../utils/tailwind-utils";

interface LabelProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    as?: "label" | "dt" | "p" | "span";
    htmlFor?: string;
}

const Label = ({
    children,
    as: Component = "p",
    className,
    ...props
}: LabelProps) => {
    return (
        <Component
            className={cn(
                "text-xs font-medium uppercase tracking-wide text-text-muted",
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Label;
