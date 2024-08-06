import { create } from "zustand";
import { User } from "../types";

interface Store {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
}

interface Actions {
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuth = create<Store & Actions>((set) => ({
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoggedIn: !!localStorage.getItem("token"),
  login: (token, user) =>
    set(() => {
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return {
        token,
        user,
        isLoggedIn: true,
      };
    }),
  logout: () =>
    set(() => {
      localStorage.clear();

      return { token: null, user: null, isLoggedIn: false };
    }),
}));
