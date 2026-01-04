<script lang="ts">
	export let scrollOffset = 0;

	$: grayscale = Math.max(0, 100 - scrollOffset / 5);
	$: hue = scrollOffset / 5;
</script>

<div class="background-container">
	<div class="grid-layer" style:filter={`grayscale(${grayscale}%) hue-rotate(${hue}deg)`}></div>
	<div class="noise-layer"></div>
</div>

<style lang="scss">
	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		background-color: black;
		overflow: hidden;

		.grid-layer {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(to right, rgba(255, 0, 0, 0.4) 1px, transparent 1px),
				linear-gradient(to bottom, rgba(255, 0, 0, 0.4) 1px, transparent 1px);
			background-size: 40px 40px;
			transition: filter 0.1s linear;
		}

		.noise-layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0.05;
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
			pointer-events: none;
		}
	}
</style>
