import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFilter,
  createSortOption,
  deleteFilter,
  deleteSortOption,
  getFilters,
  getSortOptions,
  updateFilter,
  updateSortOption,
} from "../service/filters.api";
import type {
  CreateFilterRequest,
  CreateSortOptionRequest,
} from "../service/filters.type";

const FILTERS_KEY = ["filters"];
const SORTS_KEY = ["sort-options"];

export const useFilters = () =>
  useQuery({
    queryKey: FILTERS_KEY,
    queryFn: async () => (await getFilters()).data,
  });

export const useCreateFilter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFilterRequest) => createFilter(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: FILTERS_KEY }),
  });
};

export const useUpdateFilter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateFilterRequest> }) =>
      updateFilter(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: FILTERS_KEY }),
  });
};

export const useDeleteFilter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFilter(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: FILTERS_KEY }),
  });
};

export const useSortOptions = () =>
  useQuery({
    queryKey: SORTS_KEY,
    queryFn: async () => (await getSortOptions()).data,
  });

export const useCreateSortOption = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSortOptionRequest) => createSortOption(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: SORTS_KEY }),
  });
};

export const useUpdateSortOption = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateSortOptionRequest> }) =>
      updateSortOption(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: SORTS_KEY }),
  });
};

export const useDeleteSortOption = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSortOption(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: SORTS_KEY }),
  });
};
