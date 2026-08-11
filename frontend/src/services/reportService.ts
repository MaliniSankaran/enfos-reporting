import type { Report } from "../types/Report";
import { API_BASE_URL } from "./apiConfig";

export async function getReports(): Promise<Report[]> {
    const response = await fetch(`${API_BASE_URL}/reports`);
    if (!response.ok) {
        throw new Error(`Failed to fetch reports: ${response.status}`);
    }
    return response.json();
}