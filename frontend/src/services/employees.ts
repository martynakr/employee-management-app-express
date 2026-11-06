export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    workEmail: string;
}

const API_URL = "http://localhost:3000/api/";
export async function getEmployees(search = ""): Promise<Employee[]> {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const response = await fetch(`${API_URL}employees?${params}`);
    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return await response.json();
}
