import { useQuery } from "@tanstack/react-query";
import { getAllEmployees, type Employee } from "../services/employees";
import H1 from "../components/typography/H1/H1";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";

const EmployeesPage = () => {
    const {
        data: employees,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employees"],
        queryFn: getAllEmployees,
    });

    console.log(employees);
    return (
        <div>
            <H1>Employees</H1>

            <div>
                {employees &&
                    employees.map((e: Employee) => (
                        <EmployeeCard key={e._id} employee={e} />
                    ))}
            </div>
        </div>
    );
};

export default EmployeesPage;
