export type StaffRole = "WAITER" | "CHEF" | "CASHIER" | "MANAGER";

export interface StaffData {
    _id: string;
    full_name: string;
    email: string;
    phone: string;
    employee_code: string;
    role: StaffRole;
    organization_id: string;
    branch_id: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    permissions: {
        can_create_order: boolean;
        can_update_order: boolean;
        can_cancel_payment: boolean;
        can_handle_payment: boolean;
    };
    work_status: {
        is_on_duty: boolean;
        shift_starts?: string;
        shift_end?: string;
    };
}

export interface CreateStaffRequest {
    full_name: string;
    email: string;
    phone: string;
    password?: string;
    employee_code: string;
    role: StaffRole;
    organization_id?: string;
    branch_id: string;
    permissions?: {
        can_create_order: boolean;
        can_update_order: boolean;
        can_cancel_payment: boolean;
        can_handle_payment: boolean;
    };
}

export interface GetStaffRequest {
    page?: number;
    limit?: number;
    query?: string;
    role?: StaffRole;
    is_active?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    organization_id?: string;
    branch_id?: string;
}
