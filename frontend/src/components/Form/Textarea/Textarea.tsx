import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "../../../utils/tailwind-utils";

interface TextareaProps<
    T extends FieldValues = FieldValues,
> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: Path<T>;
    register: UseFormRegister<T>;
    label?: string;
    error?: string;
    placeholder?: string;
    wrapperClassName?: string;
}

const Textarea = <T extends FieldValues = FieldValues>({
    name,
    register,
    label,
    error,
    placeholder,
    className,
    wrapperClassName,
    ...props
}: TextareaProps<T>) => {
    return (
        <div className={cn("flex flex-col gap-1", wrapperClassName)}>
            {label && (
                <label className="font-bold" htmlFor={name}>
                    {label}:
                </label>
            )}
            <textarea
                id={name}
                placeholder={placeholder}
                {...props}
                {...register(name)}
                className={cn(
                    "max-h-28 min-h-10 w-full resize-none rounded-xl border bg-surface px-3 py-2 text-sm text-text-main outline-none placeholder:text-text-muted focus:ring-1 disabled:bg-background",
                    error
                        ? "border-error focus:border-error focus:ring-error"
                        : "border-border focus:border-primary focus:ring-primary",
                    className,
                )}
            />
            {error && <p className="text-error text-small">{error}</p>}
        </div>
    );
};

export default Textarea;
