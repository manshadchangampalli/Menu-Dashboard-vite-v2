import type { User } from "@/pages/login/service/login.type";

export interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
}
