<script lang="ts">
	import { onMount } from "svelte";

	let loadscreen: HTMLElement;

	onMount(() => {
		if (loadscreen) {
			loadscreen.style.opacity = "0";
			loadscreen.style.filter = "blur(100px)";
			loadscreen.style.pointerEvents = "none";
			requestAnimationFrame(() => {
				window.scrollTo(0, 0);
			});
			setTimeout(() => {
				loadscreen.remove();
			}, 3000);
		}
	});


</script><div
	bind:this={loadscreen}
	id="loadscreen"
	style="background-color: rgb(0, 0, 0);;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1001;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 3s;"
>
	<img
		id="loadicon"
		src="img/loading.png"
		alt="Loading Icon"
		style="width: 10%;
      animation: Loading 1s infinite,LoadingHue 1s infinite;
      animation-timing-function:cubic-bezier(1, 0.82, 0.165, 0);"
	/>

	<div
		class="wave"
		style="
    animation: SlideWave 2s linear infinite,LoadingHue 1s cubic-bezier(1, 0.82, 0.165, 0) infinite; 
    animation-delay: 0s;
    width: 100%;
    height: 10%;
    bottom: 0px;
    position: absolute; 
    opacity: 0.2;"
	></div>

	<div
		class="wave"
		style="
    animation: SlideWave 1s linear infinite,LoadingHue 1s cubic-bezier(1, 0.82, 0.165, 0) infinite;
    animation-delay: 0s;
    width: 100%;
    height: 10%;
    bottom: 0px;
    position: absolute;
    opacity: 0.5;"
	></div>
</div>

<style>
	/* Styles for LoadScreen component */
	@keyframes Loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes LoadingHue {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}

	@keyframes SlideWave {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	.wave {
		background-image: url("/img/wave.png");
		background-size: cover;
		background-repeat: repeat-x;
	}

</style>