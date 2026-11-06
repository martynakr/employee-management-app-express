import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "../../utils/tailwind-utils";

interface FormProps<T extends FieldValues> {
    children: ReactNode;
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => unknown;
    className?: string;
}

const Form = <T extends FieldValues>({
    children,
    methods,
    onSubmit,
    className = "",
}: FormProps<T>) => {
    return (
        <form
            className={cn("my-8 flex flex-col gap-4", className)}
            onSubmit={methods.handleSubmit(onSubmit)}
        >
            {children}
        </form>
    );
};

export default Form;
