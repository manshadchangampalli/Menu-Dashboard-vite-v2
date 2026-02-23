import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenu } from "../service/menu.api";

export const useCreateMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
    });
};
