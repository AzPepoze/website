<script>
	import Page from "../Page.svelte";
	import { page } from "$lib/stores/page";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
</script>

<Page>
	{#if $page === 3}
		<div
			class="Collum3"
			in:scrollTransition={{ y: 100, duration: 1000, delay: 200, blur: 5 }}
			out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
		>
			<div class="MediumText">Original [Playlist]</div>
			<iframe
				src="https://www.youtube.com/embed/videoseries?list=PLr6Nl-A8PXhzm5TACMb7g-bGHn4R4kVwp"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="margin-bottom-40"
			></iframe>
		</div>

		<div
			class="Collum3"
			in:scrollTransition={{ y: 100, duration: 1000, delay: 400, blur: 5 }}
			out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
		>
			<div class="MediumText">Remix [Playlist]</div>
			<iframe
				src="https://www.youtube.com/embed/videoseries?list=PLr6Nl-A8PXhwjiXddfsmlHgCX4bpNxvLq"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>

		<div
			class="Collum3"
			in:scrollTransition={{ y: 100, duration: 1000, delay: 600, blur: 5 }}
			out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
		>
			<div class="MediumText">Piano Cover [Playlist]</div>
			<iframe
				src="https://www.youtube.com/embed/videoseries?list=PLr6Nl-A8PXhyoGniP2Az6VgHkaVkJdd1g"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</Page>

<style>
	iframe {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		margin-bottom: 20px;
	}

	@media (max-width: 768px) {
		iframe {
			max-width: 90%;
		}
	}

	@media (min-width: 769px) {
		.Collum3:nth-child(1) iframe {
			margin-bottom: 40%;
		}
		.Collum3:nth-child(3) .MediumText {
			margin-top: 40%;
		}
	}

</style>