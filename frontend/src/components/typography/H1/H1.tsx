import type { ReactNode } from "react";
import { cn } from "../../../utils/tailwind-utils";

interface H1Props extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
> {
    children: ReactNode;
}

const H1 = ({ children, className = "" }: H1Props) => {
    return (
        <h1
            className={cn(
                "text-heading font-heading font-bold my-2",
                className,
            )}
        >
            {children}
        </h1>
    );
};

export default H1;
