import Input from "../Input/Input";
import Button from "../../Button/Button";
import Form from "../Form";
import { useForm, useWatch } from "react-hook-form";
import { searchSchema, type SearchFormValues } from "./searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface SearchbarProps {
    onSearch: (search: string) => void;
    label?: string;
}
const Searchbar = ({ onSearch, label }: SearchbarProps) => {
    const methods = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    });

    const search = useWatch({
        control: methods.control,
        name: "search",
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(search.trim());
        }, 500);

        return () => clearTimeout(timeout);
    }, [search, onSearch]);

    return (
        <Form methods={methods} onSubmit={() => {}}>
            <Input
                label={label}
                name={"search"}
                register={methods.register}
                placeholder="Search"
            />
        </Form>
    );
};

export default Searchbar;
