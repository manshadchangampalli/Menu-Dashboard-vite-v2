import type { Order } from "./order.type";

export const MOCK_ORDERS: Order[] = [
    {
        id: "#ORD-2841",
        timestamp: "Today, 12:45 PM",
        timeAgo: "3 mins ago",
        customer: { 
            name: "John Doe", 
            initials: "JD",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            address: "425 Park Ave, Apt 12B\nNew York, NY 10022",
            isRepeat: true
        },
        items: "2x Wagyu Burger, 1x Truffle Fries",
        itemsDetail: [
            {
                id: "1",
                name: "Wagyu Truffle Burger",
                quantity: 2,
                price: 42.00,
                specialInstructions: "No onions",
                addons: ["Add Cheddar", "Medium Rare"]
            },
            {
                id: "2",
                name: "Parmesan Truffle Fries",
                quantity: 1,
                price: 12.20
            }
        ],
        total: "$63.96",
        subtotal: 54.20,
        serviceFee: 5.42,
        tax: 4.34,
        paymentMethod: "Apple Pay",
        status: "Pending",
        kitchenNotes: "Customer is allergic to sesame. Please ensure buns are sesame-free.",
        tableNo: "Table 12",
        serverName: "Sarah Jenkins",
        timeline: [
            { status: "Order Received", time: "Today, 12:45 PM", completed: true },
            { status: "Preparing", time: "Expected: 12:55 PM", completed: false }
        ]
    },
    {
        id: "#ORD-2839",
        timestamp: "Today, 12:38 PM",
        timeAgo: "10 mins ago",
        customer: { name: "Alice Smith", initials: "AS" },
        items: "1x Caesar Salad, 2x Salmon Grill",
        total: "$78.50",
        status: "Preparing",
    },
    {
        id: "#ORD-2835",
        timestamp: "Today, 12:20 PM",
        timeAgo: "28 mins ago",
        customer: { name: "Marcus Kane", initials: "MK" },
        items: "3x Pepperoni Pizza Large",
        total: "$62.00",
        status: "Ready",
    },
    {
        id: "#ORD-2832",
        timestamp: "Today, 11:55 AM",
        timeAgo: "53 mins ago",
        customer: { name: "Linda Blair", initials: "LB" },
        items: "2x Pasta Carbonara, 1x Red Wine",
        total: "$45.00",
        status: "Ready",
    },
    {
        id: "#ORD-2831",
        timestamp: "Today, 11:30 AM",
        timeAgo: "1h ago",
        customer: { name: "Sam Wilson", initials: "SW" },
        items: "1x Mushroom Risotto",
        total: "$22.00",
        status: "Delivered",
    },
];
