<script lang="ts">
	export let rotationIntensity = 5;
	export let scale = 1.02;
	export let className = "";
	export let perspective = 1000;
	export let bg = true;

	let card: HTMLElement;

	function handleMouseMove(e: MouseEvent) {
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -rotationIntensity;
		const rotateY = ((x - centerX) / centerX) * rotationIntensity;

		card.style.setProperty("--mouse-x", `${x}px`);
		card.style.setProperty("--mouse-y", `${y}px`);

		card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
	}

	function handleMouseLeave() {
		if (!card) return;
		card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
	}
</script>

<div
	class="tilt-card {className}"
	class:bg
	bind:this={card}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
>
	<slot />
</div>

<style>
	.tilt-card {
		transition: transform 0.1s ease-out;
		transform-style: preserve-3d;
	}

	.bg {
		background: rgba(10, 10, 10, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
	}
</style>
