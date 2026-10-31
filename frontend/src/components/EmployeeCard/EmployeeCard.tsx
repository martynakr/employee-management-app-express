import type { Employee } from "../../services/employees";

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    return (
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr_auto] items-center gap-4 bg-surface border border-border rounded-lg px-6 py-4 hover:bg-background transition-colors">
            <div>
                <p className="font-heading text-body font-semibold text-text-main">
                    {employee.firstName} {employee.lastName}
                </p>
            </div>

            <div className="min-w-0">
                <p className="text-xs text-text-muted mb-1">Work email</p>
                <p className="text-body truncate text-text-main">
                    {employee.workEmail}
                </p>
            </div>
            <div className="flex justify-end">
                <button
                    className="text-primary hover:text-navy font-medium text-small transition-colors"
                    onClick={() => console.log("View employee:", employee._id)}
                >
                    View details
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
