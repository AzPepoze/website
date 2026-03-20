<script lang="ts">
	import { page } from "$lib/stores/page";
	import type { Snippet } from "svelte";

	let {
		index,
		children,
		className = "",
	} = $props<{
		index: number;
		children: Snippet;
		className?: string;
	}>();
</script>

<div class="Page {className}">
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
		padding: 4rem 2rem 8rem; /* Space for Header and BottomNav */
	}

	@media (max-width: 768px) {
		.Page {
			flex-direction: column;
			padding: 2rem 1rem 6rem; /* Reduced paddings */
			justify-content: flex-start;
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
