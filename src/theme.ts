import { variable } from "lusiajs";

export type Theme = "light" | "dark";

const KEY = "azpepoze-theme";

function readStored(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage may be blocked; fall through to the system preference.
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export const theme = variable<Theme>(readStored());

export function applyTheme() {
  document.documentElement.dataset.theme = theme.value;
}

export function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  applyTheme();
  try {
    localStorage.setItem(KEY, theme.value);
  } catch {
    // Storage may be blocked; the theme still applies for this visit.
  }
}
