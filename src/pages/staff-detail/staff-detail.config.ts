import { TrendingUp, CheckCircle, Star, DollarSign, Utensils, Calendar, Package } from "lucide-react";
import type { StaffDetailData } from "./staff-detail.type";

export const STAFF_DETAIL_DATA: StaffDetailData = {
    profile: {
        id: "1",
        name: "Michael Chen",
        role: "Branch Manager",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPkp61zV93HfwnCFBEVSrQ0C6RZ__d4NLO2CQQgoanXjzbFNWkhEpb5pxSVYjPB2YBQ3Ji157n592lM8fh3j1VABiBP0emn--ldqHBVF1g0Ktm126SAxEnHptIh2buPKa-CCBsFqL6lsu1X3vtQcH-fAR3RGHvbV0LnuZSscv4hA5GQcfpUVrdyA-xBD0BEeTskxTvvRsU4ClnkkY2c9sR_sYCNEbggiib2qojGqUcYILxr-uX6ApCuDn7cdwjKGe0YkuULxFDkgJR",
        status: "Active",
        email: "m.chen@bistroos.com",
        phone: "+1 (555) 123-4567",
        joinDate: "March 12, 2022"
    },
    branches: [
        { id: "1", name: "Downtown Bistro", isPrimary: true },
        { id: "2", name: "Lakeside Grill", isPrimary: false },
        { id: "3", name: "The Rooftop Lounge", isPrimary: false }
    ],
    stats: [
        {
            label: "Orders Processed",
            value: "1,284",
            trend: "12%",
            trendUp: true,
            icon: TrendingUp
        },
        {
            label: "Shifts Completed",
            value: "342",
            subtext: "98% On-time",
            icon: CheckCircle,
            iconColor: "text-emerald-500"
        },
        {
            label: "Avg. Rating",
            value: "4.8",
            subtext: "Top 5%",
            icon: Star,
            iconColor: "text-amber-500"
        },
        {
            label: "Revenue Managed",
            value: "$12.4k",
            subtext: "Last 30 Days",
            icon: DollarSign
        }
    ],
    activity: [
        {
            id: "1",
            title: "Updated Dinner Menu prices",
            time: "2 hours ago",
            description: "Adjusted pricing for 12 items in the Seasonal Specials category at Downtown Bistro.",
            icon: Utensils,
            type: "menu"
        },
        {
            id: "2",
            title: "Approved Weekly Schedule",
            time: "Yesterday, 4:15 PM",
            description: "Finalized staffing shifts for the period of Oct 21 - Oct 27 for all managed branches.",
            icon: Calendar,
            type: "schedule"
        },
        {
            id: "3",
            title: "Inventory Reorder Initiated",
            time: "Oct 18, 11:30 AM",
            description: "Processed bulk wine and spirits order for Lakeside Grill ($3,450.00).",
            icon: Package,
            type: "inventory"
        }
    ]
};
