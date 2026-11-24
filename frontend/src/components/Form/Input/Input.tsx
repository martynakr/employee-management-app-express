import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "../../../utils/tailwind-utils";

interface InputProps<
    T extends FieldValues = FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: Path<T>;
    register: UseFormRegister<T>;
    label?: string;
    error?: string;
    placeholder?: string;
}

const Input = <T extends FieldValues = FieldValues>({
    name,
    register,
    label,
    error,
    placeholder,
    className,
    ...props
}: InputProps<T>) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="font-bold" htmlFor={name}>
                    {label}:
                </label>
            )}
            <input
                id={name}
                placeholder={placeholder}
                {...props}
                {...register(name)}
                className={cn(
                    "h-10 w-full rounded-xl border bg-surface px-3 py-2 text-sm text-text-main outline-none placeholder:text-text-muted focus:ring-1 disabled:bg-background",
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

export default Input;
