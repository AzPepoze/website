<script lang="ts">
	let { scrollOffset = 0 } = $props<{ scrollOffset?: number }>();

	let parallax1 = $derived(scrollOffset * 0.2);
	let parallax2 = $derived(scrollOffset * 0.4);
	let parallax3 = $derived(scrollOffset * 0.1);
</script>

<div class="background-container">
	<!-- Animated Grid Layer -->
	<div class="grid-layer" style:transform={`translateY(${-parallax1}px)`}></div>

	<!-- Aesthetic Lines Layer -->
	<div class="lines-layer">
		<div class="line l1"></div>
		<div class="line l2"></div>
		<div class="line l3"></div>
	</div>

	<!-- Secondary Parallax Elements -->
	<div class="circles-layer" style:transform={`translateY(${-parallax2}px)`}>
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
		height: 120vh;
		background-color: var(--bg-secondary);
		transition: background-color 0.5s ease;
		overflow: hidden;

		.grid-layer {
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
			background-image: linear-gradient(to right, var(--grid-color) 2px, transparent 2px),
				linear-gradient(to bottom, var(--grid-color) 2px, transparent 2px);
			background-size: 100px 100px;
			pointer-events: none;
			animation: GridMove 40s linear infinite;
			opacity: 0.8;
		}

		.lines-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;

			.line {
				position: absolute;
				background: linear-gradient(-45deg, transparent, var(--text-color), transparent);
				box-shadow: 0 0 20px var(--text-color);
				opacity: 0.2;
				height: 2px;
				width: 300px;

				&.l1 {
					top: -10%;
					left: 10%;
					animation: CometMove 8s linear infinite;
				}
				&.l2 {
					top: 20%;
					left: -10%;
					animation: CometMove 12s linear infinite 2s;
				}
				&.l3 {
					top: -20%;
					left: 50%;
					animation: CometMove 10s linear infinite 5s;
				}
			}
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
		.noise-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 200%;
			opacity: 0.02;
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
			pointer-events: none;
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

	@keyframes CometMove {
		0% {
			transform: translate(-300px, -300px) rotate(45deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translate(150vw, 150vh) rotate(45deg);
			opacity: 0;
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
