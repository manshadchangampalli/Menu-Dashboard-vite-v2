import { useQuery } from "@tanstack/react-query";
import { getBranchById } from "../service/branch-detail.api";

export const useBranchDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["branch", id],
    queryFn: () => getBranchById(id!),
    enabled: !!id,
  });
};
