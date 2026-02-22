export const ApiEndpoints = {
  LOGIN: "auth/admin/login",
  LOGOUT: "auth/admin/logout",
  CREATE_BRANCH: "branches/create",
  GET_ALL_BRANCHES: "branches/get-all",
  DELETE_BRANCH: "branches",
  UPDATE_BRANCH: "branches",
  GET_BRANCH: "branches",
  DOWNLOAD_BRANCHES: "branches/download",
  CREATE_CATEGORY: "category/create",
  GET_CATEGORIES: "category/get-all",
  DELETE_CATEGORY: "category",
} as const;

export type ApiEndpoints = typeof ApiEndpoints[keyof typeof ApiEndpoints];
