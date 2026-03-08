import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStaff, getStaff, deleteStaff, updateStaff, downloadStaff } from "../service/staff.api";
import type { CreateStaffRequest, GetStaffRequest } from "../staff.type";

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffRequest) => createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

export const useStaff = (params: GetStaffRequest) => {
  return useQuery({
    queryKey: ["staff", params],
    queryFn: () => getStaff(params),
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateStaffRequest> }) =>
      updateStaff(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      queryClient.invalidateQueries({ queryKey: ["staff", variables.id] });
    },
  });
};

export const useDownloadStaff = () => {
  return useMutation({
    mutationFn: () => downloadStaff(),
  });
};
