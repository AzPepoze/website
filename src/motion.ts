import { HOVER_AREA, EASE, EDGE, ON, SCREEN, type AnimateItem, type Keyframes } from "lusiajs";

export const reduced = SCREEN.REDUCED_MOTION.value;

export function motion(item: AnimateItem | Keyframes | (AnimateItem | Keyframes)[]) {
  return reduced ? [] : item;
}

export const lift: Keyframes = {
  0: { translate: "0px 0px" },
  1: [EASE.STYLE.BACK, EASE.OUT, { translate: "0px -6px" }],
};

function bounce(tilt: number, counter: number): Keyframes {
  return {
    0: { translate: "0px 0px", scale: "1 1", rotate: "0deg" },
    0.3: [EASE.STYLE.BACK, EASE.OUT, { translate: "0px -18px", scale: "0.9 1.2", rotate: `${tilt}deg` }],
    0.6: [EASE.STYLE.BACK, EASE.OUT, { translate: "0px -6px", scale: "1.1 0.92", rotate: `${counter}deg` }],
    1: [EASE.STYLE.ELASTIC, EASE.OUT, { translate: "0px 0px", scale: "1 1", rotate: "0deg" }],
  };
}

export const bounceLeft: Keyframes = bounce(-8, 3);
export const bounceRight: Keyframes = bounce(8, -3);

const REST = { translate: "0px 0px", scale: "1 1", rotate: "0deg" };
// Leaving starts from wherever the letter is, so it eases back instead of replaying the bounce in reverse.
const settle: Keyframes = { 0: REST, 1: [EASE.STYLE.QUART, EASE.OUT, REST] };

export function letterBounce(index: number): AnimateItem {
  return {
    play: index % 2 === 0 ? bounceLeft : bounceRight,
    on: ON.HOVER,
    duration: 520,
    options: { area: HOVER_AREA.ELEMENT, out: settle, outDuration: 260 },
  };
}

export const pop: Keyframes = {
  0: { opacity: 0, scale: "0.4" },
  1: [EASE.STYLE.ELASTIC, EASE.OUT, { opacity: 1, scale: "1" }],
};

export const fadeAway: Keyframes = {
  0: { opacity: 1, translate: "0px 0px" },
  1: { opacity: 0.1, translate: "0px -120px" },
};

export function tilt({ x, y }: { x: number; y: number }) {
  return {
    transform: `perspective(800px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 16}deg)`,
  };
}

type Side = "left" | "right";

const SLIDE_PX = SCREEN.PHONE.value ? 32 : 64;
const LIST_CAP = 8;
const LIST_STEP = 50;

function slideIn(x: number): Keyframes {
  return {
    0: { opacity: 0, translate: `${x}px 0px` },
    1: [EASE.STYLE.QUART, EASE.OUT, { opacity: 1, translate: "0px 0px" }],
  };
}

export const fromLeft: AnimateItem = { play: slideIn(-SLIDE_PX), on: ON.VIEW, duration: 650, options: { reverse: true } };
export const fromRight: AnimateItem = { play: slideIn(SLIDE_PX), on: ON.VIEW, duration: 650, options: { reverse: true } };

function slideOut(x: number): Keyframes {
  return {
    0: { opacity: 1, translate: "0px 0px" },
    1: [EASE.STYLE.CUBIC, EASE.IN, { opacity: 0, translate: `${x}px 0px` }],
  };
}

export const LIST_LEAVE_MS = 250 + LIST_CAP * 25;
export const LIST_ENTER_MS = LIST_CAP * LIST_STEP + 450;

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, reduced ? 0 : ms));
}

export function listItem(
  side: Side,
  index: number,
  { step = LIST_STEP, duration = 450, distance = SLIDE_PX, attach = false }: { step?: number; duration?: number; distance?: number; attach?: boolean } = {},
): AnimateItem {
  const x = side === "left" ? -distance : distance;
  const delay = Math.min(index, LIST_CAP) * step;
  if (attach) return { play: slideIn(x), on: ON.ATTACH, duration, delay };
  return { play: slideIn(x), on: ON.VIEW, duration, delay, options: { reverse: true } };
}

export function listRow(
  side: Side,
  index: number,
  { step = LIST_STEP, duration = 450, distance = SLIDE_PX, attach = false }: { step?: number; duration?: number; distance?: number; attach?: boolean } = {},
): AnimateItem[] {
  if (reduced) return [];
  const capped = Math.min(index, LIST_CAP);
  const leave: AnimateItem = { play: slideOut(side === "left" ? -distance : distance), on: ON.DETACH, duration: 250, delay: (LIST_CAP - capped) * 25 };
  return [listItem(side, index, { step, duration, distance, attach }), leave];
}

export const hoverItem: AnimateItem = { play: lift, on: ON.HOVER, duration: 260 };
export const tiltItem: AnimateItem = { play: tilt, on: ON.MOUSE_MOVE, duration: 320 };
export const leave: AnimateItem = {
  play: fadeAway,
  on: ON.SCROLL,
  options: { start: [EDGE.TOP, EDGE.CENTER], end: [EDGE.BOTTOM, EDGE.TOP] },
};

export function glowOn(root: HTMLElement, selector: string): () => void {
  if (reduced) return () => {};
  const onMove = (event: PointerEvent) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };
  root.addEventListener("pointermove", onMove);
  return () => root.removeEventListener("pointermove", onMove);
}
