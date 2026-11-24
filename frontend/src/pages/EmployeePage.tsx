import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getEmployee } from "../services/employees";
import H1 from "../components/typography/H1/H1";
import Loader from "../components/Loader/Loader";
import Card from "../components/Card/Card";
import Avatar from "../components/Avatar/Avatar";
import Label from "../components/typography/Label/Label";

const EmployeePage = () => {
    const { employeeId = "" } = useParams();

    const {
        data: employee,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["employee", employeeId],
        queryFn: () => getEmployee(employeeId),
        enabled: Boolean(employeeId),
        retry: false,
    });

    return (
        <div className="flex flex-col gap-6">
            <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 text-small font-medium text-primary hover:text-navy"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                Back to employees
            </Link>

            {isLoading && <Loader label="Loading employee..." />}

            {error && (
                <p className="py-12 text-center text-error">{error.message}</p>
            )}

            {employee && (
                <Card as="section" className="p-8">
                    <div className="mb-8 flex items-center gap-5">
                        <Avatar
                            name={`${employee.firstName} ${employee.lastName}`}
                            size="lg"
                        />
                        <H1 className="my-0 text-4xl">
                            {employee.firstName} {employee.lastName}
                        </H1>
                    </div>

                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label as="dt" className="mb-1">
                                First name
                            </Label>
                            <dd className="text-text-main">
                                {employee.firstName}
                            </dd>
                        </div>
                        <div>
                            <Label as="dt" className="mb-1">
                                Last name
                            </Label>
                            <dd className="text-text-main">
                                {employee.lastName}
                            </dd>
                        </div>
                        <div>
                            <Label as="dt" className="mb-1">
                                Personal email
                            </Label>
                            <dd>
                                <a
                                    href={`mailto:${employee.email}`}
                                    className="break-all text-text-main hover:text-primary hover:underline"
                                >
                                    {employee.email}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <Label as="dt" className="mb-1">
                                Work email
                            </Label>
                            <dd>
                                <a
                                    href={`mailto:${employee.workEmail}`}
                                    className="break-all text-text-main hover:text-primary hover:underline"
                                >
                                    {employee.workEmail}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </Card>
            )}
        </div>
    );
};

export default EmployeePage;
