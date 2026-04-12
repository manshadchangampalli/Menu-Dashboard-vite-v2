export enum UserRole {
  ORG_ADMIN = 'ORG_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  STAFF = 'STAFF',
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organizationId: string;
  branchIds: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}
