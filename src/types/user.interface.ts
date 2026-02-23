export type UserRole = "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "INSTRUCTOR";

export interface UserInfo {
  id: string;
  email: string;
  name: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}
