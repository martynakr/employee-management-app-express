import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployees, type Employee } from "../services/employees";
import H1 from "../components/typography/H1/H1";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
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

    console.log(employees);
    return (
        <div>
            <div className="flex items-center justify-between">
                <H1>Employees</H1>
                <Searchbar onSearch={setSearch} label="Search for employees" />
            </div>

            <div >
                {employees &&
                    employees.map((e: Employee) => (
                        <EmployeeCard key={e._id} employee={e} />
                    ))}
            </div>
        </div>
    );
};

export default EmployeesPage;
