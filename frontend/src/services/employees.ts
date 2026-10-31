export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    workEmail: string;
}

const API_URL = "http://localhost:3000/api/";
export async function getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_URL}employees`);
    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return await response.json();
}
