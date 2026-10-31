import type { RequestHandler } from "express";
import * as contractService from "./contract.service.js";

export const createContract: RequestHandler<{ employeeId: string }> = async (
    req,
    res,
    next,
) => {
    try {
        const { employeeId } = req.params;
        const contract = await contractService.createContractForEmployee(
            employeeId,
            req.body,
        );
        res.status(201).json(contract);
    } catch (error) {
        next(error);
    }
};

export const getContracts: RequestHandler<{ employeeId: string }> = async (
    req,
    res,
    next,
) => {
    try {
        const { employeeId } = req.params;
        const contract =
            await contractService.getContractsForEmployee(employeeId);
        res.status(200).json(contract);
    } catch (error) {
        next(error);
    }
};
