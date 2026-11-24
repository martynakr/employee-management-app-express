import { cn } from "../../utils/tailwind-utils";

interface AvatarProps {
    name: string;
    size?: "md" | "lg";
    className?: string;
}

const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const first = words[0]?.charAt(0) ?? "";
    const last = words.length > 1 ? words[words.length - 1].charAt(0) : "";
    return `${first}${last}`.toUpperCase();
};

const sizes = {
    md: "size-11 text-small font-extrabold",
    lg: "size-16 text-xl",
};

const Avatar = ({ name, size = "md", className }: AvatarProps) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary",
                sizes[size],
                className,
            )}
        >
            {getInitials(name)}
        </div>
    );
};

export default Avatar;
