<script lang="ts">
	import { page } from "$lib/stores/page";
	export let index: number;
</script>

<div class="Page" style:opacity={$page === index ? 1 : 0} style:pointer-events={$page === index ? "all" : "none"}>
	<slot />
</div>

<style>
	.Page {
		min-width: 100%;
		scroll-snap-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: -webkit-fill-available;
		height: -moz-available;
		position: relative;
		transition: opacity 0.5s ease-in-out;
	}

	@media (max-width: 768px) {
		.Page {
			flex-direction: column;
		}
	}

	:global(.Page > .LeftFrame),
	:global(.Page > .RightFrame) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-width: 50%;
	}

	:global(.Page > .Collum3) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-width: 33.33%;
	}
</style>
