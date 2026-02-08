import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
    },
]);
