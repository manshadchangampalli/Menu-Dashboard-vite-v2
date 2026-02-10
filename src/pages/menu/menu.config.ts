import type { Menu } from "./menu.type";

export const MOCK_MENUS: Menu[] = [
    {
        id: "1",
        name: "Main Menu",
        description: "Our standard diverse offering available all day.",
        status: "active",
        type: "dine-in",
        availability: {
            startTime: "11:00",
            endTime: "23:00",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        categoryCount: 5,
        itemCount: 42,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-03-20T15:30:00Z"
    },
    {
        id: "2",
        name: "Breakfast Menu",
        description: "Early bird specials and morning favorites.",
        status: "active",
        type: "both",
        availability: {
            startTime: "06:00",
            endTime: "11:00",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        categoryCount: 3,
        itemCount: 18,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-02-10T09:15:00Z"
    },
    {
        id: "3",
        name: "Ramadan Special",
        description: "Exclusive selection for the holy month.",
        status: "active",
        type: "both",
        availability: {
            startTime: "18:00",
            endTime: "02:00",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        categoryCount: 2,
        itemCount: 8,
        createdAt: "2024-03-01T12:00:00Z",
        updatedAt: "2024-03-01T12:00:00Z"
    },
    {
        id: "4",
        name: "Delivery Exclusives",
        description: "Items optimized for travel and delivery only.",
        status: "inactive",
        type: "delivery",
        availability: {
            startTime: "00:00",
            endTime: "23:59"
        },
        categoryCount: 4,
        itemCount: 15,
        createdAt: "2024-02-20T14:20:00Z",
        updatedAt: "2024-02-25T11:45:00Z"
    }
];
