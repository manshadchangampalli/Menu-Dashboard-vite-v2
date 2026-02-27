
import {
  LayoutDashboard,
  Activity,
  Calendar,
  Utensils,
  ListOrdered,
  Store,
  Users,
  BarChart2,
  Settings,
  LogOut,
  BookOpen,

} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    url: "/",
    id: "overview",
  },
  {
    title: "Live Orders",
    icon: Activity,
    url: "/orders",
    id: "live-orders",
  },
  {
    title: "Reservations",
    icon: Calendar,
    url: "/reservations",
    id: "reservations",
  },
  {
    title: "Menus",
    icon: BookOpen,
    url: "/menu",
    id: "menus",
  },
  {
    title: "Products",
    icon: Utensils,
    url: "/menu-items",
    id: "menu-items",
  },
  {
    title: "Categories",
    icon: ListOrdered,
    url: "/categories",
    id: "categories",
  },
  {
    title: "Branches",
    icon: Store,
    url: "/branches",
    id: "branches",
  },
  {
    title: "Staff Members",
    icon: Users,
    url: "/staff",
    id: "staff-members",
  },
  {
    title: "Analytics",
    icon: BarChart2,
    url: "/analytics",
    id: "analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
    id: "settings",
  },
  {
    title: "Logout",
    icon: LogOut,
    url: "#",
    id: "logout",
  },
];
