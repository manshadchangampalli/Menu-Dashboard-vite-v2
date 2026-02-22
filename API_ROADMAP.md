# 🚀 API Roadmap & Implementation Map

This document outlines the required APIs for the Menu Dashboard, ordered by implementation priority based on data dependencies.

---

## 📅 Priority 1: Master Data (Foundational)
These are required before we can create Products.

### 1. Branches
Restaurant locations.
- **`GET /v1/branches`** (Filters: name, city, isActive | Pagination: page, limit)
- **`POST /v1/branches`** (Create)
- **`PATCH /v1/branches/:id`** (Update)
- **`DELETE /v1/branches/:id`**

### 2. Categories
Product groupings (e.g., Appetizers, Beverages).
- **`GET /v1/categories`** (Filters: name, isActive, menuId)
- **`POST /v1/categories`**
- **`PATCH /v1/categories/:id`**

### 3. Menus
High-level groupings e.g., Breakfast, Lunch.
- **`GET /v1/menus`**
- **`POST /v1/menus`**

---

## 📦 Priority 2: Core Inventory

### 4. Menu Items (Products)
The core entities of the dashboard.
- **`GET /v1/menu-items`** (Filters: categoryId, menuId, search | Pagination: page, limit, sortBy)
- **`POST /v1/menu-items`** (Create with images, variants, attributes)
- **`PATCH /v1/menu-items/:id`**
- **`DELETE /v1/menu-items/:id`**

---

## ⚙️ Priority 3: Operations

### 5. Staff
Role and branch management.
- **`GET /v1/staff`** (Filter: branchId, role)
- **`POST /v1/staff`**
- **`PATCH /v1/staff/:id`**

### 6. Orders
Real-time console.
- **`GET /v1/orders`** (Filters: status, branchId, dateRange | Pagination: page, limit)
- **`PATCH /v1/orders/:id`** (Update Status)

### 7. Reservations
Booking management.
- **`GET /v1/reservations`**
- **`PATCH /v1/reservations/:id`**

---

## 📊 Priority 4: Insights

### 8. Analytics
- **`GET /v1/analytics/overview`** (Dashboard stats)
- **`GET /v1/analytics/reports`** (Detailed trends)

---

## 🛠️ Global API Structure

All API responses should follow this standard wrapper:

```json
{
  "success": true,
  "status": 200,
  "message": "Success message",
  "data": { ... },
  "meta": {
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

### HTTP Status Codes
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Server Error`: Unexpected error
