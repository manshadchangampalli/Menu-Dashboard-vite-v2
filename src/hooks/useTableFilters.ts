import { useSearchParams } from "react-router";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";

export interface TableFilters {
  page: number;
  limit: number;
  query: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  status: string;
  [key: string]: any;
}

export type UseTableQueryResult<T> = UseQueryResult<T, Error> & {
  filters: TableFilters;
  setFilters: (newFilters: Partial<TableFilters>) => void;
  updateFilter: (key: keyof TableFilters | string, value: any) => void;
  resetFilters: () => void;
  refresh: () => void;
};

/**
 * A reusable hook to manage table filters and synchronize them with the URL query parameters.
 */
export const useTableFilters = (defaultFilters: Partial<TableFilters> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const params: Record<string, any> = { ...defaultFilters };

    searchParams.forEach((value, key) => {
      if (key === "page" || key === "limit") {
        const numValue = parseInt(value, 10);
        params[key] = isNaN(numValue) ? defaultFilters[key] : numValue;
      } else {
        params[key] = value;
      }
    });

    return {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      query: params.query ?? "",
      sortBy: params.sortBy ?? "created_at",
      sortOrder: (params.sortOrder as "asc" | "desc") ?? "desc",
      status: params.status ?? "all",
      ...params,
    } as TableFilters;
  }, [searchParams, defaultFilters]);

  const setFilters = useCallback(
    (newFilters: Partial<TableFilters>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(newFilters).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "" || (key === "status" && value === "all")) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        
        if ((newFilters.query !== undefined || newFilters.status !== undefined) && newFilters.page === undefined) {
          next.set("page", "1");
        }
        
        return next;
      }, { replace: true });
    },
    [setSearchParams]
  );

  const updateFilter = useCallback(
    (key: keyof TableFilters | string, value: any) => {
      setFilters({ [key]: value });
    },
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
  };
};

/**
 * A comprehensive hook that manages filters and fetches data using React Query.
 */
export const useTableQuery = <T>(
  queryKey: string,
  fetchFn: (params: TableFilters) => Promise<T>,
  defaultFilters: Partial<TableFilters> = {}
): UseTableQueryResult<T> => {
  const { filters, setFilters, updateFilter, resetFilters } = useTableFilters(defaultFilters);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => {
      // Clean up UI-only filter values before sending to API
      const { status, query: searchQuery, ...otherFilters } = filters;
      const apiParams = {
        ...otherFilters,
        ...(status !== "all" ? { status } : {}),
        ...(searchQuery ? { query: searchQuery } : {}),
      } as TableFilters;
      
      return fetchFn(apiParams);
    },
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  }, [queryClient, queryKey]);

  return {
    ...query,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    refresh,
  };
};
