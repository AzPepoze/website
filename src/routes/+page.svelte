<script lang="ts">
	import { onMount } from "svelte";
	import BackgroundImage from "$lib/components/BackgroundImage.svelte";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import HomePage from "$lib/components/pages/HomePage.svelte";
	import FeaturedProjectsPage from "$lib/components/pages/FeaturedProjectsPage.svelte";
	import AllReposPage from "$lib/components/pages/AllReposPage.svelte";
	import SocialsPage from "$lib/components/pages/SocialsPage.svelte";
	import ContactPage from "$lib/components/pages/ContactPage.svelte";
	import LoadScreen from "$lib/components/LoadScreen.svelte";
	import MouseEffects from "$lib/components/MouseEffects.svelte";
	import { page } from "$lib/stores/page";

	let scrollTop = $state(0);
	let mainContainer: HTMLElement;

	function handleScroll() {
		if (!mainContainer) return;
		scrollTop = mainContainer.scrollTop;

		const windowHeight = window.innerHeight;
		const currentPage = Math.floor(
			(scrollTop + windowHeight / 3) / windowHeight,
		);

		page.subscribe(($p) => {
			if ($p !== currentPage) page.set(currentPage);
		})();
	}

	function handleNavigate(pageNumber: number) {
		const targetSection = document.getElementById(`page-${pageNumber}`);
		if (targetSection) {
			targetSection.scrollIntoView({ behavior: "smooth" });
		}
	}

	function handleWheel(e: WheelEvent) {
		if ((e.target as HTMLElement).closest("[data-prevent-page-scroll]")) {
			return;
		}

		e.preventDefault();
		const direction = e.deltaY > 0 ? 1 : -1;
		let currentPage = 0;
		page.subscribe(($p) => (currentPage = $p))();

		const nextPage = Math.max(0, Math.min(4, currentPage + direction));
		if (nextPage !== currentPage) {
			handleNavigate(nextPage);
		}
	}

	onMount(() => {
		if (mainContainer) {
			handleScroll();
			mainContainer.addEventListener("scroll", handleScroll, {
				passive: true,
			});
			mainContainer.addEventListener("wheel", handleWheel, {
				passive: false,
			});
		}

		return () => {
			if (mainContainer) {
				mainContainer.removeEventListener("scroll", handleScroll);
				mainContainer.removeEventListener("wheel", handleWheel);
			}
		};
	});
</script>

<div class="main-container" bind:this={mainContainer}>
	<BackgroundImage scrollOffset={scrollTop} />
	<LoadScreen />
	<MouseEffects />

	<div class="pages">
		<section id="page-0" class="stack-section">
			<HomePage />
		</section>
		<section id="page-1" class="stack-section">
			<FeaturedProjectsPage />
		</section>
		<section id="page-2" class="stack-section">
			<AllReposPage />
		</section>
		<section id="page-3" class="stack-section">
			<SocialsPage />
		</section>
		<section id="page-4" class="stack-section">
			<ContactPage />
		</section>
	</div>

	<BottomNav onnavigate={handleNavigate} />
</div>

<style>
	.main-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: var(--bg-color);
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}

	.pages {
		position: relative;
		width: 100%;
	}

	.stack-section {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		scroll-snap-align: start;
		scroll-snap-stop: always;

		@media (max-width: 1024px) {
			padding-bottom: 120px;
		}
	}
</style>
