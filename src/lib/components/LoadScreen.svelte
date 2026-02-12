<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme";

	let loadscreen: HTMLElement;
	let isLoaded = false;

	onMount(() => {
		// Start exit animation after a short delay or when everything is ready
		setTimeout(() => {
			isLoaded = true;
			setTimeout(() => {
				if (loadscreen) loadscreen.remove();
			}, 2000);
		}, 1000);
	});
</script>

<div
	bind:this={loadscreen}
	id="loadscreen"
	class:exit={isLoaded}
	class:light={$theme === "light"}
>
	<div class="content">
		<img
			id="loadicon"
			src="img/loading.png"
			alt="Loading Icon"
			class:blur-out={isLoaded}
		/>
	</div>

	<div class="waves-container" class:blur-out={isLoaded}>
		<div class="wave w1"></div>
		<div class="wave w2"></div>
	</div>
</div>

<style lang="scss">
	#loadscreen {
		background-color: #050505;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 1.5s ease-in-out, background-color 0.5s ease;

		&.light {
			background-color: #f0f0f5;
			#loadicon { filter: invert(1); }
		}

		&.exit {
			opacity: 0;
			pointer-events: none;
		}
	}

	.content {
		position: relative;
		z-index: 2;
	}

	#loadicon {
		width: 80px;
		height: 80px;
		animation: Loading 1.5s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
		transition: filter 1.5s ease-in-out, opacity 1s ease;

		&.blur-out {
			filter: blur(40px);
			opacity: 0;
		}
	}

	.waves-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 15%;
		overflow: hidden;
		transition: filter 1.5s ease-in-out, opacity 1s ease;

		&.blur-out {
			filter: blur(40px);
			opacity: 0;
		}
	}

	.wave {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 200%;
		height: 100%;
		background-image: url("/img/wave.png");
		background-size: 50% 100%;
		background-repeat: repeat-x;
		opacity: 0.3;

		&.w1 {
			animation: SlideWave 3s linear infinite;
		}
		&.w2 {
			animation: SlideWave 2s linear infinite reverse;
			opacity: 0.15;
			bottom: 5px;
		}
	}

	@keyframes Loading {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes SlideWave {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}
</style>
