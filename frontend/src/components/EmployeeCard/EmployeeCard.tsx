import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import type { Employee } from "../../services/employees";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Avatar from "../Avatar/Avatar";
import Label from "../typography/Label/Label";

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const navigate = useNavigate();
    const fullName = `${employee.firstName} ${employee.lastName}`;

    return (
        <Card
            as="article"
            interactive
            className="group grid grid-cols-1 items-center gap-4 px-6 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] sm:gap-6"
        >
            <div className="flex min-w-0 items-center gap-4">
                <Avatar name={fullName} />
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
                <Label className="mb-0.5 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faBriefcase} className="text-[0.7rem]" />
                    Work email
                </Label>
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
                    onClick={() => navigate(`/employees/${employee._id}`)}
                >
                    View details
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs transition-transform group-hover:translate-x-0.5"
                    />
                </Button>
            </div>
        </Card>
    );
};

export default EmployeeCard;
