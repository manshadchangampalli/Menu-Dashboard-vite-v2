export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
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
