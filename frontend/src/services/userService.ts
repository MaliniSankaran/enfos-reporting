import type { User } from "../types/User";
import { API_BASE_URL } from "./apiConfig";

export async function getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/reports/users`);
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return response.json();
}