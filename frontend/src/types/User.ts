export type UserRole = "ADMIN" | "MANAGER" | "USER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

export interface User {
    userId: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdDate: string;
}