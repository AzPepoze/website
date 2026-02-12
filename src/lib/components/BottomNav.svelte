<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "../stores/page";

	export let onnavigate: (page: number) => void = () => {};

	let buttonContainer: HTMLElement;

	onMount(() => {
		setTimeout(() => {
			if (buttonContainer) {
				buttonContainer.style.bottom = "20px";
			}
		}, 500);
	});

	function navigateTo(pageNumber: number) {
		onnavigate(pageNumber);
	}
</script>

<div bind:this={buttonContainer} id="ButtonContainer">
	<div class="nav-wrapper">
		<button on:click={() => navigateTo(0)} class:selected={$page === 0}> HOME </button>
		<button on:click={() => navigateTo(1)} class:selected={$page === 1}> PROJECTS </button>
		<button on:click={() => navigateTo(2)} class:selected={$page === 2}> REPOS </button>
		<button on:click={() => navigateTo(3)} class:selected={$page === 3}> SOCIALS </button>
	</div>
</div>

<style>
	#ButtonContainer {
		bottom: -100px;
		left: 0;
		width: 100%;
		height: auto;
		position: fixed;
		display: flex;
		justify-content: center;
		pointer-events: none;
		transition: bottom 1s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 100;
	}

	.nav-wrapper {
		display: flex;
		flex-direction: row;
		background: var(--bg-color);
		border: 1px solid var(--stroke-color);
		border-radius: 50px;
		padding: 5px;
		gap: 5px;
		pointer-events: auto;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	button {
		background: transparent;
		border: none;
		color: var(--text-color);
		opacity: 0.5;
		cursor: pointer;
		padding: 12px 24px;
		font-size: 1rem;
		font-family: "JetBrains Mono", monospace;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: all 0.3s ease;
		border-radius: 40px;
		white-space: nowrap;
	}

	button:hover {
		opacity: 1;
		background-color: var(--accent-color);
	}

	button.selected {
		color: var(--bg-color);
		background-color: var(--text-color);
		font-weight: bold;
		opacity: 1;
	}

	@media (max-width: 768px) {
		.nav-wrapper {
			width: 95%;
			justify-content: space-between;
			border-radius: 20px;
		}

		button {
			font-size: 0.7rem;
			padding: 10px 10px;
			border-radius: 15px;
			flex-grow: 1;
		}
	}
</style>
