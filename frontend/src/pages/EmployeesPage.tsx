import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployees } from "../services/employees";
import H1 from "../components/typography/H1/H1";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import { useState } from "react";
import Searchbar from "../components/Form/Searchbar/Searchbar";

const EmployeesPage = () => {
    const [search, setSearch] = useState("");
    const {
        data: employees,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employees", search],
        queryFn: () => getEmployees(search),
        placeholderData: keepPreviousData,
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <H1>Employees</H1>
                <Searchbar onSearch={setSearch} label="Search for employees" />
            </div>

            {employees && <EmployeeList employees={employees} />}
        </div>
    );
};

export default EmployeesPage;
