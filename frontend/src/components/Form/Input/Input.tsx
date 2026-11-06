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
                    "w-full rounded border border-navy p-1  bg-white focus:border-primary focus:ring-1 focus:ring-primary ",
                    error
                        ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                        : "focus:border-navy focus:ring-1 focus:ring-navy",
                    className,
                )}
            />
            {error && <p className="text-error text-small">{error}</p>}
        </div>
    );
};

export default Input;
