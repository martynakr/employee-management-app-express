import type { CreateContractData } from "./contract.dto.js";
import Contract from "./contract.model.js";

export async function overlappingContractExists(
    employeeId: string,
    newContractStartDate: Date,
    newContractEndDate: Date | null,
) {
    const query: Record<string, unknown> = {
        employeeId: employeeId,
        $or: [{ endDate: null }, { endDate: { $gte: newContractStartDate } }],
    };

    if (newContractEndDate) {
        query.startDate = { $lte: newContractEndDate };
    }

    const existingContract = await Contract.exists(query);

    return existingContract !== null;
}

export function create(data: CreateContractData) {
    return Contract.create(data);
}

export function findAllByEmployeeId(employeeId: string) {
    return Contract.find({ employeeId })
        .sort({ startDate: -1 })
        .populate("departmentId", "name")
        .populate("roleId", "name");
}

export function findActiveByEmployeeId(employeeId: string) {
    const today = new Date();

    return Contract.findOne({
        employeeId,
        startDate: { $lte: today },
        $or: [{ endDate: null }, { endDate: { $gte: today } }],
    });
}
