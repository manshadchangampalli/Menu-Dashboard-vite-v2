export enum BranchStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum BranchType {
  MAIN_HQ = 'main_hq',
  STANDARD = 'standard'
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AddressDetail {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  map_location_url: string;
  coordinates: Coordinates;
}

export interface OperatingHour {
  day: DayOfWeek | string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface OccupancyStats {
  capacity: number;
  current_occupancy?: number;
}

export interface CreateBranchRequest {
  name: string;
  branch_type: BranchType | string;
  address_detail: AddressDetail;
  phone: string;
  organization_id: string;
  email: string;
  manager_id: string;
  operating_hours: OperatingHour[];
  occupancy_stats: OccupancyStats;
  status: BranchStatus | string;
}

export interface BranchData extends CreateBranchRequest {
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
  occupancy_stats: Required<OccupancyStats>;
}

export interface Branch {
  id: string;
  name: string;
  type: BranchType | string;
  address: string;
  district: string;
  managerName: string;
  managerAvatar: string;
  status: "Open" | "Closed" | "active" | "inactive" | BranchStatus;
}
