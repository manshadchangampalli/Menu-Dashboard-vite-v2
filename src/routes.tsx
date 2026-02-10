
import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import Overview from "./pages/overview/Overview";
import Orders from "./pages/orders/Orders";
import Reservations from "./pages/reservations/Reservations";
import MenuItemList from "./pages/menu-items/MenuItemList";
import Menu from "./pages/menu/Menu";
import MenuDetail from "./pages/menu-detail/MenuDetail";
import Categories from "./pages/categories/Categories";
import Branches from "./pages/branches/Branches";
import StaffMembers from "./pages/staff/Staff";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import BranchDetail from "./pages/branch-detail/BranchDetail";
import StaffDetail from "./pages/staff-detail/StaffDetail";
import Login from "./pages/login/Login";

export const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
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
                path: "menu-items",
                Component: MenuItemList,
            },
            {
                path: "menu",
                Component: Menu,
            },
            {
                path: "menu/:id",
                Component: MenuDetail,
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
                path: "staff/:id",
                Component: StaffDetail,
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
