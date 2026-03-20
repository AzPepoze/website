<script lang="ts">
	import MetroCanvas from "./MetroCanvas.svelte";
	import { onMount } from "svelte";

	let { scrollOffset = 0 } = $props<{ scrollOffset?: number }>();

	let parallax1 = $derived(scrollOffset * 0.2);
	let parallax2 = $derived(scrollOffset * 0.4);
	let parallax3 = $derived(scrollOffset * 0.1);

	let mouseX = $state(0);
	let mouseY = $state(0);
	let targetMouseX = 0;
	let targetMouseY = 0;
	let isMobile = $state(false);

	function handleMouseMove(e: MouseEvent) {
		targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
		targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
	}

	function updateMouse() {
		mouseX += (targetMouseX - mouseX) * 0.05;
		mouseY += (targetMouseY - mouseY) * 0.05;
		requestAnimationFrame(updateMouse);
	}

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth <= 768;
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		window.addEventListener("mousemove", handleMouseMove);
		updateMouse();
		return () => {
			window.removeEventListener("resize", checkMobile);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});
</script>

<div class="background-container">
	<!-- Animated Grid Layer -->
	<div
		class="grid-layer"
		style:transform={`translateY(${-parallax1}px) translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`}
	></div>

	<!-- Metro Canvas Projectiles (Disabled on Mobile for performance) -->
	{#if !isMobile}
		<MetroCanvas />
	{/if}

	<!-- Secondary Parallax Elements -->
	<div
		class="circles-layer"
		style:transform={`translateY(${-parallax2}px) translate(${mouseX}px, ${mouseY}px)`}
	>
		<div class="circle c1"></div>
		<div class="circle c2"></div>
	</div>

	<div
		class="noise-layer"
		style:transform={`translateY(${-parallax3}px) translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`}
	></div>
</div>

<style lang="scss">
	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 120vh;
		background-color: var(--bg-color);
		transition: background-color 0.5s ease;
		overflow: hidden;

		.grid-layer {
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background-image: linear-gradient(
					to right,
					var(--grid-color) 2px,
					transparent 2px
				),
				linear-gradient(
					to bottom,
					var(--grid-color) 2px,
					transparent 2px
				);
			background-size: 100px 100px;
			pointer-events: none;
			animation: GridMove 40s linear infinite;
			opacity: 0.8;
		}

		.circles-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;

			.circle {
				position: absolute;
				border-radius: 50%;
				filter: blur(40px);
				background: var(--circle-gradient);
				transition: all 1s ease;
				opacity: 1;

				&.c1 {
					width: 900px;
					height: 900px;
					top: -150px;
					right: -50px;
					animation: Float 15s ease-in-out infinite;
				}
				&.c2 {
					width: 700px;
					height: 700px;
					bottom: 10%;
					left: -80px;
					animation: Float 20s ease-in-out infinite reverse;
				}
			}
		}
	}

	@keyframes GridMove {
		0% {
			transform: perspective(1000px) rotateX(10deg) translateY(0);
		}
		100% {
			transform: perspective(1000px) rotateX(10deg) translateY(80px);
		}
	}

	@keyframes Float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(30px, -50px) scale(1.1);
		}
	}
</style>
