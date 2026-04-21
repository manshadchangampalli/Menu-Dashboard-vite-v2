import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type {
  CreateFilterRequest,
  CreateSortOptionRequest,
  Filter,
  SortOption,
} from "./filters.type";

// Filters
export const getFilters = () =>
  httpService.get<Filter[]>({ endpoint: ApiEndpoints.FILTERS });

export const createFilter = (data: CreateFilterRequest) =>
  httpService.post<Filter>({ endpoint: ApiEndpoints.FILTERS, data });

export const updateFilter = (id: string, data: Partial<CreateFilterRequest>) =>
  httpService.patch<Filter>({ endpoint: `${ApiEndpoints.FILTERS}/${id}`, data });

export const deleteFilter = (id: string) =>
  httpService.delete<void>({ endpoint: `${ApiEndpoints.FILTERS}/${id}` });

// Sort options
export const getSortOptions = () =>
  httpService.get<SortOption[]>({ endpoint: ApiEndpoints.SORT_OPTIONS });

export const createSortOption = (data: CreateSortOptionRequest) =>
  httpService.post<SortOption>({ endpoint: ApiEndpoints.SORT_OPTIONS, data });

export const updateSortOption = (id: string, data: Partial<CreateSortOptionRequest>) =>
  httpService.patch<SortOption>({ endpoint: `${ApiEndpoints.SORT_OPTIONS}/${id}`, data });

export const deleteSortOption = (id: string) =>
  httpService.delete<void>({ endpoint: `${ApiEndpoints.SORT_OPTIONS}/${id}` });
