import type { BrowserContext, Page, Route } from "@playwright/test";

type AnyRecord = Record<string, any>;

const now = "2026-04-26T10:00:00.000Z";

const meta = (total: number, page = 1, limit = 10) => ({
  timestamp: now,
  total,
  totalWithoutFilter: total,
  totalActive: total,
  page,
  limit,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

const ok = (route: Route, data: unknown, options: { status?: number; message?: string; meta?: AnyRecord } = {}) =>
  route.fulfill({
    status: options.status ?? 200,
    contentType: "application/json",
    body: JSON.stringify({
      success: true,
      status: options.status ?? 200,
      message: options.message ?? "OK",
      data,
      meta: options.meta ?? meta(Array.isArray(data) ? data.length : 1),
    }),
  });

const csv = (route: Route, body: string) =>
  route.fulfill({
    status: 200,
    contentType: "text/csv",
    body,
  });

const normalize = (value: unknown) => String(value ?? "").toLowerCase();

const applyList = (items: AnyRecord[], url: URL, searchFields: string[]) => {
  const query = normalize(url.searchParams.get("query") ?? url.searchParams.get("search"));
  let list = [...items];
  if (query) {
    list = list.filter((item) => searchFields.some((field) => normalize(item[field]).includes(query)));
  }

  const status = url.searchParams.get("status");
  if (status && status !== "all") {
    list = list.filter((item) => normalize(item.status ?? item.is_active).includes(normalize(status)));
  }

  const role = url.searchParams.get("role");
  if (role) list = list.filter((item) => item.role === role);

  const type = url.searchParams.get("type");
  if (type) list = list.filter((item) => item.type === type);

  const isActive = url.searchParams.get("is_active");
  if (isActive !== null) list = list.filter((item) => String(item.is_active) === isActive);

  const isFeatured = url.searchParams.get("is_featured");
  if (isFeatured !== null) list = list.filter((item) => String(item.is_featured) === isFeatured);

  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 10);
  return { data: list.slice((page - 1) * limit, page * limit), meta: meta(list.length, page, limit) };
};

const endpointFrom = (url: URL) => url.pathname.replace(/^\/api\/v\d+\//, "").replace(/^\/api\//, "");

const id = (prefix: string, count: number) => `${prefix}-${String(count + 1).padStart(3, "0")}`;

export function createMockDb() {
  const db = {
    branches: [
      {
        _id: "branch-001",
        name: "Downtown Bistro",
        branch_type: "standard",
        address_detail: {
          country: "UAE",
          city: "Dubai",
          citySlug: "dubai",
          state: "Dubai",
          zip_code: "00000",
          street: "Marina Walk",
          map_location_url: "",
          coordinates: { lat: 0, lng: 0 },
        },
        phone: "971500000001",
        email: "downtown@example.com",
        manager_id: "manager-001",
        operating_hours: [],
        occupancy_stats: { capacity: 80, current_occupancy: 12 },
        status: "active",
        created_at: now,
        updated_at: now,
      },
    ],
    menus: [
      {
        _id: "menu-001",
        name: "All Day Menu",
        type: "BOTH",
        description: "Core dine-in and delivery menu",
        start_time: "09:00",
        end_time: "23:00",
        status: "active",
        isActive: true,
        organization_id: "org-001",
        branch_id: "branch-001",
        categoryCount: 1,
        itemCount: 1,
        created_at: now,
        updated_at: now,
      },
    ],
    categories: [
      {
        _id: "category-001",
        name: "Burgers",
        itemCount: 1,
        icon: "UtensilsCrossed",
        image_url: "",
        isActive: true,
        menuId: "menu-001",
        branch_id: "branch-001",
        created_at: now,
        updated_at: now,
      },
    ],
    products: [
      {
        _id: "product-001",
        product_uuid: "PROD-001",
        name: "Classic Burger",
        slug: "classic-burger",
        description: "Beef burger with house sauce",
        sku: "BURG-001",
        type: "non_veg",
        spice_level: "mild",
        is_alcohol: false,
        is_featured: true,
        base_price: 38,
        base_tax_rate: 5,
        calories: 640,
        nutritional_info: { protein: 25, carbs: 48, fat: 29, fiber: 4 },
        media: [{ url: "https://placehold.co/400x300.png", type: "image", format: "glb", is_primary: true, order: 0, alt_text: "Classic Burger" }],
        tags: ["bestseller"],
        allergens: ["Gluten"],
        special_note: "House favorite",
        warning_note: "",
        is_active: true,
        is_deleted: false,
        organization_id: "org-001",
        created_at: now,
        updated_at: now,
      },
    ],
    menuItems: [
      {
        _id: "menu-item-001",
        menu_item_uuid: "MI-001",
        product_id: { _id: "product-001", name: "Classic Burger", slug: "classic-burger", type: "non_veg" },
        menu_id: "menu-001",
        category_id: "category-001",
        organization_id: "org-001",
        branch_id: "branch-001",
        base_price: 38,
        selling_price: 42,
        is_available: true,
        is_featured: true,
        sort_order: 0,
        variants: [],
        extras: [],
        created_at: now,
        updated_at: now,
      },
    ],
    staff: [
      {
        _id: "staff-001",
        full_name: "Aisha Khan",
        email: "aisha@example.com",
        phone: "971500000010",
        employee_code: "STF001",
        role: "MANAGER",
        organization_id: "org-001",
        branch_id: "branch-001",
        is_active: true,
        permissions: { can_create_order: true, can_update_order: true, can_cancel_payment: false, can_handle_payment: true },
        work_status: { is_on_duty: true },
        created_at: now,
        updated_at: now,
      },
    ],
    orders: [
      {
        _id: "order-001",
        order_uuid: "ORDER-000001",
        organization_id: "org-001",
        branch_id: "branch-001",
        customer_name: "Maya Joseph",
        customer_phone: "971500000020",
        table_number: "7",
        items: [{ menu_item_id: "menu-item-001", name: "Classic Burger", quantity: 2, unit_price: 42, total_price: 84 }],
        total_amount: 84,
        status: "PENDING",
        notes: "No onions",
        created_at: now,
        updated_at: now,
      },
    ],
    filters: [
      {
        _id: "filter-001",
        organization_id: "org-001",
        name: "Dietary",
        type: "multi",
        source: "type",
        options: [{ label: "Vegetarian", value: "veg", sort_order: 0 }],
        ranges: [],
        sort_order: 0,
        is_active: true,
      },
    ],
    sortOptions: [
      {
        _id: "sort-001",
        organization_id: "org-001",
        label: "Featured first",
        field: "featured",
        direction: "desc",
        is_default: true,
        sort_order: 0,
        is_active: true,
      },
    ],
  };

  return db;
}

export type MockDb = ReturnType<typeof createMockDb>;

export async function setupAuthenticatedContext(context: BrowserContext) {
  await context.addInitScript(() => {
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          user: {
            id: "qa-user",
            email: "qa@example.com",
            fullName: "QA Admin",
            role: "ORG_ADMIN",
            organizationId: "org-001",
            branchIds: ["branch-001"],
          },
          isLoggedIn: true,
        },
        version: 0,
      }),
    );
  });
}

export async function setupMockBackend(page: Page, db = createMockDb()) {
  await page.route("**/api/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const endpoint = endpointFrom(url);
    const method = request.method();
    const body = method === "POST" || method === "PATCH" || method === "PUT" ? await request.postDataJSON().catch(() => ({})) : {};

    if (endpoint === "auth/dashboard/login" && method === "POST") {
      return ok(route, {
        message: "Login successful",
        user: { id: "qa-user", email: "qa@example.com", fullName: "QA Admin", role: "ORG_ADMIN", organizationId: "org-001", branchIds: ["branch-001"] },
      });
    }
    if (endpoint === "auth/dashboard/refresh" || endpoint === "auth/dashboard/logout") return ok(route, {});

    if (endpoint === "branches/download" && method === "GET") return csv(route, "name,email\nDowntown Bistro,downtown@example.com\n");
    if (endpoint === "products/download-csv" && method === "GET") return csv(route, "name,sku\nClassic Burger,BURG-001\n");
    if (endpoint === "staff/download" && method === "GET") return csv(route, "name,email\nAisha Khan,aisha@example.com\n");

    const [collection, recordId, action] = endpoint.split("/");

    const collections: Record<string, { list: AnyRecord[]; idPrefix: string; search: string[] }> = {
      branches: { list: db.branches, idPrefix: "branch", search: ["name", "email", "phone"] },
      menu: { list: db.menus, idPrefix: "menu", search: ["name", "description"] },
      category: { list: db.categories, idPrefix: "category", search: ["name"] },
      products: { list: db.products, idPrefix: "product", search: ["name", "sku", "slug"] },
      staff: { list: db.staff, idPrefix: "staff", search: ["full_name", "email", "employee_code"] },
      orders: { list: db.orders, idPrefix: "order", search: ["order_uuid", "customer_name", "customer_phone"] },
      filters: { list: db.filters, idPrefix: "filter", search: ["name", "source"] },
      "sort-options": { list: db.sortOptions, idPrefix: "sort", search: ["label", "field"] },
      "menu-items": { list: db.menuItems, idPrefix: "menu-item", search: [] },
    };

    const target = collections[collection];
    if (!target) return ok(route, {});

    if (method === "GET" && !recordId) {
      const listed = applyList(target.list, url, target.search);
      return ok(route, listed.data, { meta: listed.meta });
    }

    if (method === "GET" && recordId) {
      return ok(route, target.list.find((item) => item._id === recordId) ?? null);
    }

    if (method === "POST") {
      const created = {
        ...body,
        _id: id(target.idPrefix, target.list.length),
        organization_id: "org-001",
        created_at: now,
        updated_at: now,
      };
      if (collection === "orders") {
        created.order_uuid = `ORDER-${String(target.list.length + 1).padStart(6, "0")}`;
        created.total_amount = body.items?.reduce((sum: number, item: AnyRecord) => sum + item.quantity * item.unit_price, 0) ?? 0;
        created.status = "PENDING";
      }
      if (collection === "menu-items") {
        const product = db.products.find((item) => item._id === body.product_id);
        created.menu_item_uuid = `MI-${String(target.list.length + 1).padStart(3, "0")}`;
        created.product_id = product ? { _id: product._id, name: product.name, slug: product.slug, type: product.type } : null;
        created.is_featured = false;
        created.sort_order = target.list.length;
      }
      target.list.unshift(created);
      return ok(route, created, { status: 201, message: "Created" });
    }

    if (method === "PATCH" && recordId && action === "status") {
      const item = target.list.find((entry) => entry._id === recordId);
      if (item) Object.assign(item, { status: body.status, updated_at: now });
      return ok(route, item);
    }

    if (method === "PATCH" && recordId) {
      const item = target.list.find((entry) => entry._id === recordId);
      if (item) Object.assign(item, body, { updated_at: now });
      return ok(route, item);
    }

    if (method === "DELETE" && recordId) {
      const index = target.list.findIndex((entry) => entry._id === recordId);
      if (index >= 0) target.list.splice(index, 1);
      return ok(route, { deleted: true });
    }

    return ok(route, {});
  });

  return db;
}
