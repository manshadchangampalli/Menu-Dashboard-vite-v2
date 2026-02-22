import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CreateBranchRequest, BranchData, GetBranchesRequest } from "./branches.type";

export const createBranch = (data: CreateBranchRequest) => {
  return httpService.post<BranchData>({
    endpoint: ApiEndpoints.CREATE_BRANCH,
    data,
  });
};

export const getBranches = (params: GetBranchesRequest) => {
  return httpService.get<BranchData[]>({
    endpoint: ApiEndpoints.GET_ALL_BRANCHES,
    params,
  });
};

export const deleteBranch = (id: string) => {
  return httpService.delete({
    endpoint: `${ApiEndpoints.DELETE_BRANCH}/${id}`,
  });
};

export const updateBranch = (id: string, data: Partial<CreateBranchRequest>) => {
  return httpService.patch<BranchData>({
    endpoint: `${ApiEndpoints.UPDATE_BRANCH}/${id}`,
    data,
  });
};
