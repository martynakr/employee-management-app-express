import type { Employee } from "../../services/employees";
import EmployeeCard from "../EmployeeCard/EmployeeCard";

interface EmployeeListProps {
    employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
    return (
        <>
            {employees.length === 0 && (
                <p className="py-12 text-center text-text-muted">
                    No employees found.
                </p>
            )}
            {employees.length > 0 && (
                <ul className="flex flex-col gap-3">
                    {employees.map((employee) => (
                        <li key={employee._id}>
                            <EmployeeCard employee={employee} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default EmployeeList;
