import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBranch } from "../service/branches.api";
import type { CreateBranchRequest } from "../service/branches.type";

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
