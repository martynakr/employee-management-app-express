import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../services/employees";
import Button from "../Button/Button";

interface EmployeeCardProps {
    employee: Employee;
}

const getInitials = ({ firstName, lastName }: Employee) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;

    return (
        <article className="group grid grid-cols-1 items-center gap-4 rounded-xl border border-border bg-surface px-6 py-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] sm:gap-6">
            <div className="flex min-w-0 items-center gap-4">
                <div
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-small font-bold text-primary"
                >
                    {getInitials(employee)}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate font-heading text-body font-semibold text-text-main">
                        {fullName}
                    </h3>
                    <p className="truncate text-small text-text-muted">
                        {employee.email}
                    </p>
                </div>
            </div>

            <div className="min-w-0">
                <p className="mb-0.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                    <FontAwesomeIcon icon={faBriefcase} className="text-[0.7rem]" />
                    Work email
                </p>
                <a
                    href={`mailto:${employee.workEmail}`}
                    className="block truncate text-small text-text-main hover:text-primary hover:underline"
                    title={employee.workEmail}
                >
                    {employee.workEmail}
                </a>
            </div>

            <div className="flex sm:justify-end">
                <Button
                    type="button"
                    variant="tertiary"
                    aria-label={`View details for ${fullName}`}
                    onClick={() => console.log("View employee:", employee._id)}
                >
                    View details
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs transition-transform group-hover:translate-x-0.5"
                    />
                </Button>
            </div>
        </article>
    );
};

export default EmployeeCard;
