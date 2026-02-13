<script lang="ts">
	import { page } from "$lib/stores/page";
	import type { Snippet } from "svelte";
	
	let { index, children } = $props<{ 
		index: number; 
		children: Snippet 
	}>();
</script>

<div class="Page" style:opacity={$page === index ? 1 : 0} style:pointer-events={$page === index ? "all" : "none"}>
	{@render children()}
</div>

<style>
	.Page {
		min-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100vh;
		position: relative;
		transition: opacity 0.5s ease-in-out;
		background-color: transparent;
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
