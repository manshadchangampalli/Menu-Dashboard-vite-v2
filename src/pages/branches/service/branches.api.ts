import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { CreateBranchRequest, BranchData } from "./branches.type";

export const createBranch = (data: CreateBranchRequest) => {
  return httpService.post<BranchData>({
    endpoint: ApiEndpoints.CREATE_BRANCH,
    data,
  });
};
