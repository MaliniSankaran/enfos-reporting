import type { Department } from "../types/Department";
import { API_BASE_URL } from "./apiConfig";

export async function getDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/reports/departments`);
    if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.status}`);
    }
    return response.json();
}