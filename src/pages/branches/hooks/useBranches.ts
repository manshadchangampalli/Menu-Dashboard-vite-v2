import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBranch, getBranches, deleteBranch } from "../service/branches.api";
import type { CreateBranchRequest, GetBranchesRequest } from "../service/branches.type";

export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBranchRequest) => createBranch(data),
    onSuccess: () => {
      // Invalidate branches list query if it exists
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};

export const useBranches = (params: GetBranchesRequest) => {
  return useQuery({
    queryKey: ["branches", params],
    queryFn: () => getBranches(params),
  });
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};
