import type { Category } from "../../categories/service/categories.type";

export enum MenuType {
  DINE_IN = 'DINE-IN',
  DELIVERY = 'DELIVERY',
  BOTH = 'BOTH',
}


export enum MenuStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export const DAYS_ORDERED: DayOfWeek[] = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

export interface ScheduleWindow {
  start_time: string; // "HH:mm"
  end_time: string;   // "HH:mm"
  days: DayOfWeek[];
}

export interface CreateMenuRequest {
  name: string;
  type: MenuType;
  description: string;
  schedule: ScheduleWindow[];
  status: MenuStatus;
  isActive: boolean;
  organization_id?: string;
  branch_id?: string;
  categoryCount?: number;
  itemCount?: number;
}

export interface Menu {
  _id: string;
  name: string;
  type: MenuType;
  description: string;
  schedule: ScheduleWindow[];
  status: MenuStatus;
  isActive: boolean;
  is_currently_active?: boolean;
  organization_id: string;
  branch_id?: string;
  categoryCount: number;
  itemCount: number;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  __v?: number;
}

export interface GetMenusRequest {
  query?: string;
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
