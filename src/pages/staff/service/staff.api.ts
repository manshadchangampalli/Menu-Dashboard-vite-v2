import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CreateStaffRequest, StaffData, GetStaffRequest } from "../staff.type";

export const createStaff = (data: CreateStaffRequest) => {
  return httpService.post<StaffData>({
    endpoint: ApiEndpoints.CREATE_STAFF,
    data,
  });
};

export const getStaff = (params: GetStaffRequest) => {
  return httpService.get<StaffData[]>({
    endpoint: ApiEndpoints.GET_STAFF,
    params,
  });
};

export const getStaffById = (id: string) => {
  return httpService.get<StaffData>({
    endpoint: `${ApiEndpoints.GET_STAFF}/${id}`,
  });
};

export const deleteStaff = (id: string) => {
  return httpService.delete({
    endpoint: `${ApiEndpoints.DELETE_STAFF}/${id}`,
  });
};

export const updateStaff = (id: string, data: Partial<CreateStaffRequest>) => {
  return httpService.patch<StaffData>({
    endpoint: `${ApiEndpoints.UPDATE_STAFF}/${id}`,
    data,
  });
};

export const downloadStaff = () => {
  return httpService.get({
    endpoint: ApiEndpoints.DOWNLOAD_STAFF,
    responseType: "blob",
  });
};
