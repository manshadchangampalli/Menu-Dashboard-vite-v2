# API Integration Guidelines

Follow these steps for integrating a new feature API into the project.

## Step 1: Define Types
Create a `service` folder inside the feature directory (e.g., `src/pages/feature/service`).
Add `feature.type.ts` and define the request and response interfaces.

```typescript
export interface FeatureRequest {
  // Define request fields
}

export interface FeatureResponse {
  // Define response fields (matches the 'data' property of ApiResponse)
}
```

## Step 2: Create API Service
Add `feature.api.ts` in the same `service` folder. Use the global `httpService` instance and the `ApiEndpoints` enum.

> [!IMPORTANT]
> Always add your new endpoint to `src/services/api-endpoints.ts` before using it.

```typescript
import httpService from "@/services/http";
import { ApiEndpoints } from "@/services/api-endpoints";
import type { FeatureRequest, FeatureResponse } from "./feature.type";

export const getFeatureData = (params: FeatureRequest) => {
  return httpService.get<FeatureResponse>({
    endpoint: ApiEndpoints.FEATURE_NAME,
    params,
  });
};
```

## Step 3: Create React Query Hooks
Create a `hooks` folder in the feature directory (e.g., `src/pages/feature/hooks`).
Add a hook file (e.g., `useFeature.ts`) using `@tanstack/react-query`.

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFeatureData } from "../service/feature.api";

export const useFeature = () => {
  return useQuery({
    queryKey: ["feature-key"],
    queryFn: () => getFeatureData({}),
  });
};
```

## Authentication
The project uses cookie-based authentication. The `httpService` is configured with `withCredentials: true` by default.

- **Login**: Successfully calling the login API will set the authentication cookies in the browser automatically. No manual storage in `localStorage` is required.
- **Authenticated Requests**: All subsequent requests will automatically include the session cookies.
- **Logout**: Calling the logout API will clear the session cookies on the server side. No manual cleanup in the frontend is needed.

## Step 4: Integrate in Components
Use the hook in your component. Use `isLoading`, `isError`, and `data` to handle UI states.

```tsx
const { data, isLoading } = useFeature();
```
