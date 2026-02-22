export const ApiEndpoints = {
  LOGIN: "auth/admin/login",
  LOGOUT: "auth/admin/logout",
  CREATE_BRANCH: "branches/create",
  GET_ALL_BRANCHES: "branches/get-all",
  DELETE_BRANCH: "branches",
} as const;

export type ApiEndpoints = typeof ApiEndpoints[keyof typeof ApiEndpoints];
