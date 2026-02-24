import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMenu, deleteMenu, getMenu, getMenus, updateMenu } from "../service/menu.api";
import type { CreateMenuRequest, GetMenusRequest } from "../service/menu.type";

export const useCreateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMenu,
        onSuccess: (params) => {
            queryClient.invalidateQueries({ queryKey: ["menus", params] });
        },
    });
};

export const useMenus = (params: GetMenusRequest) => {
    return useQuery({
        queryKey: ["menus", params],
        queryFn: () => getMenus(params),
    });
};

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateMenuRequest> }) => updateMenu(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteMenu(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};

export const useMenu = (id?: string) => {
    return useQuery({
        queryKey: ["menu", id],
        queryFn: () => getMenu(id!),
        enabled: !!id,
    });
};
