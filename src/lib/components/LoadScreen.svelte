<script lang="ts">
	import { onMount } from "svelte";

	let loadscreen: HTMLElement;
	let isLoaded = $state(false);

	onMount(() => {
		// Faster loading delay to feel snappier
		setTimeout(() => {
			isLoaded = true;
			setTimeout(() => {
				if (loadscreen) loadscreen.remove();
			}, 1000);
		}, 1000);
	});
</script>

<div bind:this={loadscreen} id="loadscreen" class:exit={isLoaded}>
	<div class="content">
		<div class="fast-loader" class:fade-out={isLoaded}>
			<svg viewBox="0 0 100 100" class="shape s1">
				<circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="8" fill="none" />
			</svg>
			<svg viewBox="0 0 100 100" class="shape s2">
				<polygon points="50,18 80,72 20,72" stroke="currentColor" stroke-width="8" fill="none" stroke-linejoin="round" />
			</svg>
			<svg viewBox="0 0 100 100" class="shape s3">
				<rect x="25" y="25" width="50" height="50" stroke="currentColor" stroke-width="8" fill="none" rx="8" />
			</svg>
			<svg viewBox="0 0 100 100" class="shape s4">
				<polygon points="50,15 80,33 80,67 50,85 20,67 20,33" stroke="currentColor" stroke-width="8" fill="none" stroke-linejoin="round" />
			</svg>
			<svg viewBox="0 0 100 100" class="shape s5">
				<path d="M50,20 L50,80 M20,50 L80,50" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
			</svg>
		</div>
	</div>
</div>

<style lang="scss">
	#loadscreen {
		background-color: var(--bg-color);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 1s ease-in-out;
		will-change: opacity;

		&.exit {
			opacity: 0;
			pointer-events: none;
		}
	}

	.content {
		position: relative;
		z-index: 2;
	}

	.fast-loader {
		position: relative;
		width: 10vmax;
		height: 10vmax;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: opacity 0.5s ease;
		animation: LoaderRotate 4s linear infinite;

		&.fade-out {
			opacity: 0;
		}

		.shape {
			position: absolute;
			width: 6vmax;
			height: 6vmax;
			color: var(--text-color);
			opacity: 0;
			animation: CycleFade 2.5s infinite;
			will-change: opacity;
			/* Centers the SVG explicitly */
			top: 50%;
			left: 50%;
			margin-top: -3vmax;
			margin-left: -3vmax;
		}

		.s1 { animation-delay: 0s; }
		.s2 { animation-delay: 0.5s; }
		.s3 { animation-delay: 1s; }
		.s4 { animation-delay: 1.5s; }
		.s5 { animation-delay: 2s; }
	}

	/* 
		Hardware-accelerated zero-lag animation. 
		2.5s total. 20% = 0.5s per slot.
	*/
	@keyframes CycleFade {
		0% {
			opacity: 0;
		}
		8%, 12% {
			opacity: 1;
		}
		20%, 100% {
			opacity: 0;
		}
	}

	@keyframes LoaderRotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
