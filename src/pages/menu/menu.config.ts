import type { MenuItem } from "./menu.type";

export const MENU_CATEGORIES = ["Appetizers", "Main Course", "Desserts", "Beverages", "Sides"] as const;

export const MENU_TYPES = ["Breakfast", "Lunch", "Dinner", "Ramadan Special"] as const;

const commonDescription = "Experience culinary excellence with our carefully crafted dish, made from the finest ingredients sourced locally.";

export const MOCK_MENU_ITEMS: MenuItem[] = [
    // Breakfast
    {
        id: "1",
        name: "Classic Avocado Toast",
        sku: "BF-AVO-001",
        shortDescription: "Creamy avocado on toasted whole grain bread.",
        longDescription: "Our signature Avocado Toast features perfectly ripe avocados mashed with a hint of lime and sea salt, spread generously over artisan whole grain bread. Topped with a perfectly poached egg, a sprinkle of chili flakes for heat, and microgreens for freshness.",
        category: "Appetizers",
        price: 14.50,
        offerPrice: 12.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T7NbfRJrJUFw0U2as6uWVDCVdQmsiNoU1JCBzLrsNS9wlqIfb3XIWoiq8jrFCpN32zNtLA5C7b2CrPqrWeaSVO0_-poEe-Qz3PyVt0PSzI0y7du_tyh7vsJKZ_p-HB4qBQLqGXtP19qFCaeOcCFk9mnbT1GlXhUqsMvlZX37gH8k3bsan9VqB3R-pcuRCdJis6sNM_020J6HPT6oevPPnCZr4RUMpLnLt4KFgrdEKClj6033fGXe_aEgRWmTdHeL0vIw6db0MV5K",
        images: [
             "https://lh3.googleusercontent.com/aida-public/AB6AXuB2T7NbfRJrJUFw0U2as6uWVDCVdQmsiNoU1JCBzLrsNS9wlqIfb3XIWoiq8jrFCpN32zNtLA5C7b2CrPqrWeaSVO0_-poEe-Qz3PyVt0PSzI0y7du_tyh7vsJKZ_p-HB4qBQLqGXtP19qFCaeOcCFk9mnbT1GlXhUqsMvlZX37gH8k3bsan9VqB3R-pcuRCdJis6sNM_020J6HPT6oevPPnCZr4RUMpLnLt4KFgrdEKClj6033fGXe_aEgRWmTdHeL0vIw6db0MV5K",
             "https://images.unsplash.com/photo-1588137372308-15f75323a4dd?auto=format&fit=crop&q=80&w=1000",
             "https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?auto=format&fit=crop&q=80&w=1000"
        ],
        videos: [
            { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: 'cooking' } // Placeholder video
        ],
        rating: 4.8,
        reviews: 124,
        inStock: true,
        menuType: "Breakfast",
        variants: [
            { name: "With Smoked Salmon", price: 18.50, stock: true },
            { name: "Gluten Free Bread", price: 16.00, stock: true }
        ],
        attributes: [
            { name: "Calories", value: "450 kcal" },
            { name: "Allergens", value: "Egg, Gluten" }
        ]
    },
    {
        id: "4",
        name: "Cold Brew Coffee",
        sku: "BF-CB-002",
        shortDescription: "Smooth, bold, and never bitter.",
        longDescription: "Steeped for 18 hours in cold water, our Single Origin Cold Brew extracts the smoothest flavors from our ethically sourced beans. Served over crystal clear ice.",
        category: "Beverages",
        price: 5.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmyvqSSichpBpfRfsD3Lj1syK__NIjY9p9ILM8KK1LpAFQKtnaB0imfz7aPHErhxk0piMklg43D5UzVAhvLdb3e2si9hb5JXASAkEfdwhcmyWiBtxsPAh0p-p7V4xMDmUYZZvsCVfvnRlW-xrKPxr0cNVUyARl7vlqEp-qIZnS_mmyo_iPkLh2Ub2Kp39hJ3qKbd_py6ojVlJiJ4dsN2ebgMhAagobvodZdLWQIyoin_5Og9sWLx_wWF7XEATiG7KTWxQ3s9MAvxT9",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCmyvqSSichpBpfRfsD3Lj1syK__NIjY9p9ILM8KK1LpAFQKtnaB0imfz7aPHErhxk0piMklg43D5UzVAhvLdb3e2si9hb5JXASAkEfdwhcmyWiBtxsPAh0p-p7V4xMDmUYZZvsCVfvnRlW-xrKPxr0cNVUyARl7vlqEp-qIZnS_mmyo_iPkLh2Ub2Kp39hJ3qKbd_py6ojVlJiJ4dsN2ebgMhAagobvodZdLWQIyoin_5Og9sWLx_wWF7XEATiG7KTWxQ3s9MAvxT9"
        ],
        inStock: true,
        menuType: "Breakfast",
        attributes: [
            { name: "Caffeine", value: "High" },
            { name: "Size", value: "16oz" }
        ]
    },
    // Lunch
    {
        id: "2",
        name: "Wagyu Beef Burger",
        sku: "LU-BGR-001",
        shortDescription: "Premium Wagyu beef on a brioche bun.",
        longDescription: "A succulent 8oz Wagyu beef patty, grilled to perfection. Topped with our house-made truffle aioli, sweet caramelized onions, and melted sharp cheddar cheese, all nestled in a freshly baked brioche bun.",
        category: "Main Course",
        price: 24.00,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLubfuKi7Rf-b3tmvkU1VniTNJZXppfCn_eOuFCg61YdP5vZTPmTE9FDIEQCBvGd-jzJ18gzG0YoVxqGeV5gYLFkaJz1FOK3cv732TGyTpRscPOp84OqhmP4N-3OVugghTKmmrg1hA2hWBOo9TiqXE6E187ppwxKaI4pkBeIL6S-_Jg3MxVUFTrnKSS6xvRqnfEVsPRuI3L7kfYI4OrqYZ7rzfoLfbIH_N33kiuMYXNDbTIUKeQkoVWUs69YX1336AQ7NYIqkcmPoG",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLubfuKi7Rf-b3tmvkU1VniTNJZXppfCn_eOuFCg61YdP5vZTPmTE9FDIEQCBvGd-jzJ18gzG0YoVxqGeV5gYLFkaJz1FOK3cv732TGyTpRscPOp84OqhmP4N-3OVugghTKmmrg1hA2hWBOo9TiqXE6E187ppwxKaI4pkBeIL6S-_Jg3MxVUFTrnKSS6xvRqnfEVsPRuI3L7kfYI4OrqYZ7rzfoLfbIH_N33kiuMYXNDbTIUKeQkoVWUs69YX1336AQ7NYIqkcmPoG",
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000"
        ],
        rating: 4.9,
        reviews: 210,
        inStock: true,
        menuType: "Lunch",
        variants: [
            { name: "Double Patty", price: 32.00, stock: true },
            { name: "Vegan Option (Impossible)", price: 24.00, stock: true }
        ],
        attributes: [
            { name: "Meat Origin", value: "Japan" },
            { name: "Cooking Time", value: "15 mins" }
        ],
        modelUrl: "https://sketchfab.com/models/placeholder-burger/embed"
    },
    {
        id: "3",
        name: "Truffle Parmesan Fries",
        sku: "LU-SD-003",
        shortDescription: "Golden fries with truffle oil and parmesan.",
        longDescription: "Hand-cut potatoes, double fried for extra crunch. Tossed in white truffle oil and generous shavings of aged parmesan cheese. Served with garlic aioli.",
        category: "Sides",
        price: 8.95,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAlgnNu2z70yQ8TpL7FD8Ivcp-Kt9Djx7JveJ-Lc8M5giO1-8yyJyxzrSaxOBDHWMRdUzd18lZgf1Hjvt09ga6jKxZiJ4K0iIdgaQNS-0_zjIjoCqKcSWRJK0TQkRXPoiRng-hRX2beOAv0ECR-yHgRQoKnNLEbJsoBdMLJ7sXhUewiJeut-3lg3DPy-jPY9t5TXV7ycGISlyo-G0wBmchoPPULhB7cxzuCNUmd0Whh8uBnoRCZg-U12eh8TkUl3DUG7pgVxEiOsql",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAlgnNu2z70yQ8TpL7FD8Ivcp-Kt9Djx7JveJ-Lc8M5giO1-8yyJyxzrSaxOBDHWMRdUzd18lZgf1Hjvt09ga6jKxZiJ4K0iIdgaQNS-0_zjIjoCqKcSWRJK0TQkRXPoiRng-hRX2beOAv0ECR-yHgRQoKnNLEbJsoBdMLJ7sXhUewiJeut-3lg3DPy-jPY9t5TXV7ycGISlyo-G0wBmchoPPULhB7cxzuCNUmd0Whh8uBnoRCZg-U12eh8TkUl3DUG7pgVxEiOsql"
        ],
        inStock: false,
        menuType: "Lunch",
        attributes: [
             { name: "Dietary", value: "Vegetarian" }
        ]
    },
    // Dinner
    {
        id: "5",
        name: "Grilled Salmon",
        sku: "DN-MN-005",
        shortDescription: "Fresh atlantic salmon with herbs.",
        longDescription: "Sustainably sourced Atlantic salmon, grilled with lemon butter and fresh herbs. Served alongside grilled asparagus and a bed of fluffy wild rice.",
        category: "Main Course",
        price: 28.00,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=1000",
        images: [
             "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=1000"
        ],
        rating: 4.7,
        reviews: 85,
        inStock: true,
        menuType: "Dinner",
        attributes: [
            { name: "Calories", value: "650 kcal" },
            { name: "Protein", value: "45g" }
        ]
    },
    {
        id: "6",
        name: "Chocolate Lava Cake",
        sku: "DN-DS-006",
        shortDescription: "Decadent chocolate cake with molten center.",
        longDescription: "Rich dark chocolate cake with a warm, gooey molten center. Served with a scoop of Madagascar vanilla bean ice cream and fresh berries.",
        category: "Desserts",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&q=80&w=1000"
        ],
        inStock: true,
        menuType: "Dinner"
    },
    // Ramadan Special
    {
        id: "7",
        name: "Lamb Ouzi",
        sku: "RM-MN-001",
        shortDescription: "Traditional slow-cooked spiced lamb.",
        longDescription: "A festive dish featuring tender, slow-cooked lamb served over spiced oriental rice garnished with roasted almonds, pine nuts, and raisins. Accompanied by yogurt cucumber sauce.",
        category: "Main Course",
        price: 35.00,
        offerPrice: 29.99,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=1000"
        ],
        rating: 5.0,
        reviews: 42,
        inStock: true,
        menuType: "Ramadan Special",
        attributes: [
            { name: "Serving", value: "Single / Platter" },
            { name: "Spice Level", value: "Mild" }
        ]
    },
    {
        id: "9",
        name: "Vimto Mojo",
        sku: "RM-BV-003",
        shortDescription: "Sparkling berry drink.",
        longDescription: "A refreshing twist on the Ramadan classic. Sparkling soda mixed with Vimto cordial, fresh mint leaves, lime wedges, and plenty of ice.",
        category: "Beverages",
        price: 6.50,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1000"
        ],
        inStock: true,
        menuType: "Ramadan Special"
    }
];
