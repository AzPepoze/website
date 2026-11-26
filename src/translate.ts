export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "th", name: "ไทย" },
  { code: "ja", name: "日本語" },
  { code: "zh-CN", name: "简体中文" },
  { code: "ko", name: "한국어" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type GoogleTranslateElement = new (options: { pageLanguage: string }, id: string) => unknown;

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: GoogleTranslateElement } };
  }
}

export const ELEMENT_ID = "google_translate_element";
const READY_EVENT = "google-translate-ready";
const COOKIE = "googtrans";
const POLL_MS = 100;
const POLL_LIMIT = 100;

let mounted = false;
let listening = false;

export function shortCode(code: LangCode): string {
  return code.split("-")[0].toUpperCase();
}

export function readLanguage(): LangCode {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/);
  return LANGUAGES.find((language) => language.code === match?.[1])?.code ?? "en";
}

function mountTranslate(): void {
  const TranslateElement = window.google?.translate?.TranslateElement;
  if (mounted || !TranslateElement || !document.getElementById(ELEMENT_ID)) return;
  mounted = true;
  Reflect.construct(TranslateElement, [{ pageLanguage: "en" }, ELEMENT_ID]);
}

export function startTranslate(): void {
  if (!listening) {
    listening = true;
    window.addEventListener(READY_EVENT, mountTranslate);
  }
  mountTranslate();
}

function waitForCombo(): Promise<HTMLSelectElement> {
  return new Promise((resolve, reject) => {
    let ticks = 0;
    const timer = window.setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (combo) {
        window.clearInterval(timer);
        resolve(combo);
        return;
      }
      ticks += 1;
      if (ticks >= POLL_LIMIT) {
        window.clearInterval(timer);
        reject(new Error("Google Translate did not load"));
      }
    }, POLL_MS);
  });
}

function clearCookie(): void {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  const host = window.location.hostname;
  document.cookie = `${COOKIE}=; ${expired}`;
  document.cookie = `${COOKIE}=; ${expired}; domain=${host}`;
  document.cookie = `${COOKIE}=; ${expired}; domain=.${host}`;
}

export async function setLanguage(code: LangCode): Promise<void> {
  const combo = await waitForCombo();
  combo.value = code === "en" ? "" : code;
  combo.dispatchEvent(new Event("change"));
  if (code !== "en") return;
  window.setTimeout(() => {
    if (readLanguage() === "en") return;
    clearCookie();
    window.location.reload();
  }, 1000);
}
