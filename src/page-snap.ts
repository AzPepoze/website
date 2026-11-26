function sections(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>("main > section")];
}

function currentIndex(): number {
  return Math.floor((window.scrollY + window.innerHeight / 3) / window.innerHeight);
}

export function startPageSnap(): () => void {
  function onWheel(event: WheelEvent) {
    if (event.ctrlKey) return;
    if ((event.target as Element).closest("[data-prevent-page-scroll]")) return;

    event.preventDefault();
    const list = sections();
    const current = currentIndex();
    const next = Math.max(0, Math.min(list.length - 1, current + (event.deltaY > 0 ? 1 : -1)));
    if (next !== current) list[next].scrollIntoView({ behavior: "smooth" });
  }

  window.addEventListener("wheel", onWheel, { passive: false });
  return () => window.removeEventListener("wheel", onWheel);
}
