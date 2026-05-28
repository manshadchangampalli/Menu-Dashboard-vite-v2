import { BranchType, City, CitySlug, type Branch } from "../service/branches.type";

export const MOCK_BRANCHES: Branch[] = [
    {
        id: "1",
        name: "Downtown Bistro",
        type: "Main HQ",
        address: "124 Market St, San Francisco, CA",
        district: "Financial District",
        status: "Open"
    },
    {
        id: "2",
        name: "Lakeside Grill",
        type: "Suburban",
        address: "455 Lakeview Dr, Austin, TX",
        district: "West Lake Hills",
        status: "Open"
    },
    {
        id: "3",
        name: "The Rooftop Lounge",
        type: "Seasonal",
        address: "100 Broadway, New York, NY",
        district: "Manhattan",
        status: "Closed"
    },
    {
        id: "4",
        name: "Harbor Express",
        type: "Delivery Hub",
        address: "22 Pier Way, Seattle, WA",
        district: "Waterfront",
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
