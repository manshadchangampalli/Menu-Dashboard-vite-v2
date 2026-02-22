import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { BranchDetailResponse } from "./branch-detail.type";

export const getBranchById = (id: string) => {
  return httpService.get<BranchDetailResponse>({
    endpoint: `${ApiEndpoints.GET_BRANCH}/${id}`,
  });
};
