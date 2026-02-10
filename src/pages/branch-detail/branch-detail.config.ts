export const BRANCH_DETAIL_DATA = {
    id: "1",
    name: "Downtown Bistro",
    type: "Main HQ",
    status: "Open",
    stats: {
        sales: {
            value: "$4,285.50",
            trend: "+12% from yesterday",
            trendDirection: "up"
        },
        activeOrders: {
            value: 24,
            detail: "Average wait: 18m"
        },
        occupancy: {
            value: 82,
            detail: "82%"
        }
    },
    generalInfo: {
        address: "124 Market St, San Francisco, CA 94105",
        district: "Financial District",
        phone: "+1 (415) 555-0123",
        email: "downtown@bistro-os.com",
        manager: {
            name: "Michael Chen",
            role: "General Manager",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMzu455RKXc5QZ9HWOYdKpZ7VAWnj053fUJzSIGDjbkgUd_NP1-y2tw1cEMZr4-5dRvyfOueqRvx6KXHzgxlO6HFX13MTfvrUsOQ3tb-plXSIRMrAG-9HdrOCJ0k3wIiMBMRsS4pmRXIHYMRxnq3gCCuyc8lNK5kGxvsV7_AEcJ9U8L3siNtfbR3PozDvY-scLS4w8BJcyA5zJfM6Ass2lHNpo5IdyuxAfGuCS2U878oB88dSZMcQpMFePqqu1-imxj_GDhC_nz4g"
        }
    },
    hours: [
        { day: "Monday", time: "08:00 AM - 10:00 PM" },
        { day: "Tuesday", time: "08:00 AM - 10:00 PM" },
        { day: "Wednesday", time: "08:00 AM - 10:00 PM" },
        { day: "Thursday", time: "08:00 AM - 11:00 PM" },
        { day: "Friday", time: "08:00 AM - 12:00 AM", highlight: true },
        { day: "Saturday", time: "09:00 AM - 12:00 AM" },
        { day: "Sunday", time: "Closed", closed: true }
    ],
    staff: [
        {
            name: "Amanda Ross",
            role: "Floor Manager",
            status: "active",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMQ8ULifD_PvI6_Hu47XNT6pKr3pCgfgcOh0rg54IwDsC0yL5NiHAGp2hqlKrwldRaFD9q9ErbTqGjcxC6Bo5-eGLQg-5AcZjKNCTha1-BPM6p2LvShogRHgY803aZGMhqsRA0ioJQU3Kzn26T-HR9ru51s_5cVG43__lcgrDqwWX-nWwkD57T1gy8pXmIe2YtWzQK2Qk1ObQX4rQky80YRNIeUgZNYyzSkYQOZns6jyfNU5MpScS-Rbdm7ccVZ_wtA3_6G8z0MJE"
        },
        {
            name: "David Kim",
            role: "Head Chef",
            status: "active",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB03Ou7YUTBnRwnEDH2RdEnnytWYcQYQalZMMSl6azzMB248MDuczHnlQ9DZ2DV4QEUagkbW0Hx4llC_51K2g8D2HlnehC7y8zvo-_W0vzF06XC_MSNy34iYI-HYNGwdkWsEJ45P3BaIo2ivOY6cbZE7XeJrSnrhp2EdrKpgjvxVTHi-sdVKUig60L5r7RYUdN6Dwpxle7vi3cH0pddGOH9f8_Ju26XGQWsWn9emqeyxvvqshTUfAy3OX7OHUMRZ1VtkPGS9BMg4E8"
        },
        {
            name: "Elena Vassili",
            role: "Shift Supervisor",
            status: "inactive",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXq0Nhgbg4tayZZgXZqHkfyaULdtTqyRactB8f6UgchvQW-oYJroR036ymeCLfq4x_Q45-ITr6pW1EkLDMDXCALBnVxUjn_2xUQFFmZURPpP6Okxrrhrp3u1FXqLy-cpnMgxlEfrdxcmqc2fVYMQ8xDJ0NI2FNkTA8in1V4g7qOelNZfEsb8jK0HD9ely-2WK2saCTb54EpXtjgA6rpzUXzgZOGahHYfH69a2pyYkF-g3ffDFMtPC7O4FBt9h9a6qAoV7V2XEOl5k"
        }
    ]
};
