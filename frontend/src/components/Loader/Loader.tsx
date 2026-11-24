import { cn } from "../../utils/tailwind-utils";

interface LoaderProps {
    label?: string;
    className?: string;
}

const Loader = ({ label = "Loading...", className }: LoaderProps) => {
    return (
        <div
            role="status"
            aria-live="polite"
            className={cn(
                "flex flex-col items-center justify-center gap-3 py-12 text-text-muted",
                className,
            )}
        >
            <div
                aria-hidden="true"
                className="size-8 animate-spin rounded-full border-4 border-border border-t-primary"
            />
            <p className="text-small">{label}</p>
        </div>
    );
};

export default Loader;
