import { BranchType, City, CitySlug, type Branch } from "../service/branches.type";

export const MOCK_BRANCHES: Branch[] = [
    {
        id: "1",
        name: "Downtown Bistro",
        type: "Main HQ",
        address: "124 Market St, San Francisco, CA",
        district: "Financial District",
        managerName: "Michael Chen",
        managerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMzu455RKXc5QZ9HWOYdKpZ7VAWnj053fUJzSIGDjbkgUd_NP1-y2tw1cEMZr4-5dRvyfOueqRvx6KXHzgxlO6HFX13MTfvrUsOQ3tb-plXSIRMrAG-9HdrOCJ0k3wIiMBMRsS4pmRXIHYMRxnq3gCCuyc8lNK5kGxvsV7_AEcJ9U8L3siNtfbR3PozDvY-scLS4w8BJcyA5zJfM6Ass2lHNpo5IdyuxAfGuCS2U878oB88dSZMcQpMFePqqu1-imxj_GDhC_nz4g",
        status: "Open"
    },
    {
        id: "2",
        name: "Lakeside Grill",
        type: "Suburban",
        address: "455 Lakeview Dr, Austin, TX",
        district: "West Lake Hills",
        managerName: "Amanda Ross",
        managerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMQ8ULifD_PvI6_Hu47XNT6pKr3pCgfgcOh0rg54IwDsC0yL5NiHAGp2hqlKrwldRaFD9q9ErbTqGjcxC6Bo5-eGLQg-5AcZjKNCTha1-BPM6p2LvShogRHgY803aZGMhqsRA0ioJQU3Kzn26T-HR9ru51s_5cVG43__lcgrDqwWX-nWwkD57T1gy8pXmIe2YtWzQK2Qk1ObQX4rQky80YRNIeUgZNYyzSkYQOZns6jyfNU5MpScS-Rbdm7ccVZ_wtA3_6G8z0MJE",
        status: "Open"
    },
    {
        id: "3",
        name: "The Rooftop Lounge",
        type: "Seasonal",
        address: "100 Broadway, New York, NY",
        district: "Manhattan",
        managerName: "David Kim",
        managerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB03Ou7YUTBnRwnEDH2RdEnnytWYcQYQalZMMSl6azzMB248MDuczHnlQ9DZ2DV4QEUagkbW0Hx4llC_51K2g8D2HlnehC7y8zvo-_W0vzF06XC_MSNy34iYI-HYNGwdkWsEJ45P3BaIo2ivOY6cbZE7XeJrSnrhp2EdrKpgjvxVTHi-sdVKUig60L5r7RYUdN6Dwpxle7vi3cH0pddGOH9f8_Ju26XGQWsWn9emqeyxvvqshTUfAy3OX7OHUMRZ1VtkPGS9BMg4E8",
        status: "Closed"
    },
    {
        id: "4",
        name: "Harbor Express",
        type: "Delivery Hub",
        address: "22 Pier Way, Seattle, WA",
        district: "Waterfront",
        managerName: "Elena Vassili",
        managerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXq0Nhgbg4tayZZgXZqHkfyaULdtTqyRactB8f6UgchvQW-oYJroR036ymeCLfq4x_Q45-ITr6pW1EkLDMDXCALBnVxUjn_2xUQFFmZURPpP6OkXrrhrp3u1FXqLy-cpnMgxlEfrdxcmqc2fVYMQ8xDJ0NI2FNkTA8in1V4g7qOelNZfEsb8jK0HD9ely-2WK2saCTb54EpXtjgA6rpzUXzgZOGahHYfH69a2pyYkF-g3ffDFMtPC7O4FBt9h9a6qAoV7V2XEOl5k",
        status: "Open"
    }
];

export const BRANCH_TYPE_OPTIONS = [
    { label: "Standard", value: BranchType.STANDARD },
    { label: "Main HQ", value: BranchType.MAIN_HQ },
    { label: "Suburban", value: BranchType.SUBURBAN },
    { label: "Seasonal", value: BranchType.SEASONAL },
    { label: "Delivery Hub", value: BranchType.DELIVERY_HUB },
];

export const CITY_OPTIONS = [
    { label: City.ABU_DHABI, value: CitySlug.ABU_DHABI },
    { label: City.DUBAI, value: CitySlug.DUBAI },
    { label: City.SHARJAH, value: CitySlug.SHARJAH },
    { label: City.AJMAN, value: CitySlug.AJMAN },
    { label: City.UMM_AL_QUWAIN, value: CitySlug.UMM_AL_QUWAIN },
    { label: City.RAS_AL_KHAIMAH, value: CitySlug.RAS_AL_KHAIMAH },
    { label: City.FUJAIRAH, value: CitySlug.FUJAIRAH },
];
