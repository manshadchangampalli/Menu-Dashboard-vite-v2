export type LoginMethod = "PASSWORD" | "EMAIL_OTP";

export interface CustomerAddress {
  _id: string;
  label?: string;
  line1: string;
  line2?: string;
  area?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  contact_phone?: string;
  notes?: string;
  is_default: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface CustomerData {
  _id: string;
  full_name: string;
  email: string;
  phone?: string;
  is_verified: boolean;
  login_method: LoginMethod;
  addresses: CustomerAddress[];
  organization_id: string;
  branch_id: string;
  created_at: string;
  updated_at: string;
}

export interface GetCustomersRequest {
  page?: number;
  limit?: number;
  query?: string;
  is_verified?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  branch_id?: string;
}
