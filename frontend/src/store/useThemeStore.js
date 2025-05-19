import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "forest", // default until client loads
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme });
  },
  hydrate: () => {
    const stored = localStorage.getItem("preferred-theme");
    if (stored) {
      set({ theme: stored });
    }
  },
}));
