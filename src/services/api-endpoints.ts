export const ApiEndpoints = {
  LOGIN: "auth/admin/login",
  LOGOUT: "auth/admin/logout",
} as const;

export type ApiEndpoints = typeof ApiEndpoints[keyof typeof ApiEndpoints];
