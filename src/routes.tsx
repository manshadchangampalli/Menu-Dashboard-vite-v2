
import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import Overview from "./pages/overview/Overview";
import Orders from "./pages/orders/Orders";
import Reservations from "./pages/reservations/Reservations";
import MenuItems from "./pages/menu/Menu";
import Categories from "./pages/categories/Categories";
import Branches from "./pages/branches/Branches";
import StaffMembers from "./pages/staff/Staff";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import BranchDetail from "./pages/branch-detail/BranchDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            {
                index: true,
                Component: Overview,
            },
            {
                path: "orders",
                Component: Orders,
            },
            {
                path: "reservations",
                Component: Reservations,
            },
            {
                path: "menu",
                Component: MenuItems,
            },
            {
                path: "categories",
                Component: Categories,
            },
            {
                path: "branches",
                Component: Branches,
            },
            {
                path: "branches/:id",
                Component: BranchDetail,
            },
            {
                path: "staff",
                Component: StaffMembers,
            },
            {
                path: "analytics",
                Component: Analytics,
            },
            {
                path: "settings",
                Component: Settings,
            },
        ],
    },
]);
