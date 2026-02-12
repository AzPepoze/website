<script lang="ts">
	import { onMount } from "svelte";

	let mouseContainer: HTMLElement;

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!mouseContainer) return;

			const mouseEffect = document.createElement("div");
			mouseEffect.style.cssText = `
        width: 10px;
        height: 10px;
        background: var(--text-color);
        position: fixed;
        transition: all 0.5s;
        opacity: 0;
        border-radius: 100%;
        transform: scale(2) rotate(0deg);
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
      `;

			mouseContainer.append(mouseEffect);

			setTimeout(() => {
				mouseEffect.style.opacity = "1";
				mouseEffect.style.transition = "all 0.2s";
				mouseEffect.style.transform = `scale(1)`;
			}, 10);

			setTimeout(() => {
				mouseEffect.style.opacity = "0";
				mouseEffect.style.transform = "scale(0)";
				setTimeout(() => mouseEffect.remove(), 500);
			}, 200);
		};

		const handleMouseDown = (e: MouseEvent) => {
			if (!mouseContainer) return;

			const mouseEffect = document.createElement("div");
			mouseEffect.style.cssText = `
        width: 10px;
        height: 10px;
        border: 1px solid var(--text-color);
        position: fixed;
        transition: all 0.5s;
        opacity: 0;
        border-radius: 100%;
        transform: scale(2) rotate(0deg);
        pointer-events: none;
        aspect-ratio: 1 / 1;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
      `;

			mouseContainer.append(mouseEffect);

			setTimeout(() => {
				mouseEffect.style.transform = `scale(10)`;
			}, 1);

			setTimeout(() => {
				mouseEffect.style.opacity = "1";
				mouseEffect.style.transition = "all 0.2s";
			}, 10);

			setTimeout(() => {
				mouseEffect.style.opacity = "0";
				setTimeout(() => mouseEffect.remove(), 500);
			}, 200);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
		};
	});
</script>

<div bind:this={mouseContainer} id="Mouse"></div>

<style>
	#Mouse {
		position: fixed;
		z-index: 101;
		top: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
