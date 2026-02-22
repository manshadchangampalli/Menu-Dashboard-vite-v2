export const ApiEndpoints = {
  LOGIN: "auth/admin/login",
  LOGOUT: "auth/admin/logout",
  CREATE_BRANCH: "branches/create",
} as const;

export type ApiEndpoints = typeof ApiEndpoints[keyof typeof ApiEndpoints];
