import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

interface ScrollTransitionParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	x?: number;
	y?: number;
	blur?: number;
	backdropBlur?: number;
}

export function scrollTransition(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 50, blur = 0 }: ScrollTransitionParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;
	const opacity = +style.opacity;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${u * x}px, ${u * y}px);
			opacity: ${t * opacity};
			filter: blur(${u * blur}px);
		`,
	};
}
