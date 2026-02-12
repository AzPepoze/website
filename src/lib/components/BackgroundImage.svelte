<script lang="ts">
	import { theme } from "$lib/stores/theme";
	export let scrollOffset = 0;

	$: parallax1 = scrollOffset * 0.2;
	$: parallax2 = scrollOffset * 0.4;
	$: parallax3 = scrollOffset * 0.1;
</script>

<div class="background-container" class:light={$theme === "light"}>
	<!-- Parallax Grid Layer -->
	<div 
		class="grid-layer" 
		style:transform={`translateY(${-parallax1}px)`}
	></div>
	
	<!-- Secondary Parallax Elements -->
	<div 
		class="circles-layer" 
		style:transform={`translateY(${-parallax2}px)`}
	>
		<div class="circle c1"></div>
		<div class="circle c2"></div>
	</div>

	<div class="noise-layer" style:transform={`translateY(${-parallax3}px)`}></div>
</div>

<style lang="scss">
	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 120vh; /* Extra height for parallax */
		z-index: -1;
		background-color: #050505;
		transition: background-color 0.5s ease;
		overflow: hidden;

		&.light {
			background-color: #f0f0f5;
			
			.grid-layer {
				background-image: 
					linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
					linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
			}

			.circle {
				background: radial-gradient(circle, rgba(0, 100, 255, 0.05) 0%, transparent 70%);
			}
		}

		.grid-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 200%;
			background-image: 
				linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
				linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
			background-size: 60px 60px;
			pointer-events: none;
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
				filter: blur(80px);
				background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
				
				&.c1 {
					width: 600px;
					height: 600px;
					top: -100px;
					right: -100px;
				}
				&.c2 {
					width: 400px;
					height: 400px;
					bottom: 10%;
					left: -50px;
				}
			}
		}

		.noise-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 200%;
			opacity: 0.03;
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
			pointer-events: none;
		}
	}
</style>
