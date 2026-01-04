<script lang="ts">
	import { onMount } from "svelte";
	import BackgroundImage from "$lib/components/BackgroundImage.svelte";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import HomePage from "$lib/components/pages/HomePage.svelte";
	import LoadScreen from "$lib/components/LoadScreen.svelte";
	import MouseEffects from "$lib/components/MouseEffects.svelte";
	import ProjectsPage from "$lib/components/pages/ProjectsPage.svelte";
	import SocialsPage from "$lib/components/pages/SocialsPage.svelte";
	import { page } from "$lib/stores/page";
	import type { PageData } from "./$types";

	export let data: PageData;

	let scrollTop = 0;
	let mainContainer: HTMLElement;

	function handleScroll() {
		if (mainContainer) {
			scrollTop = mainContainer.scrollTop;
			const currentPage = Math.round(scrollTop / window.innerHeight);
			page.set(currentPage);
		}
	}

	const handleWheel = (e: WheelEvent) => {
		if (e.deltaY === 0 || !mainContainer) return;

		let target = e.target as HTMLElement | null;
		while (target && target !== mainContainer) {
			if (target.hasAttribute("data-prevent-page-scroll")) {
				return;
			}
			target = target.parentElement;
		}

		mainContainer.scrollTo({
			top: mainContainer.scrollTop + (e.deltaY > 0 ? window.innerHeight : -window.innerHeight) / 1.2,
			behavior: "smooth",
		});
		e.preventDefault();
	};

	function handleNavigate(pageNumber: number) {
		if (!mainContainer) return;

		mainContainer.scrollTo({
			top: pageNumber * window.innerHeight,
			left: 0,
			behavior: "smooth",
		});
	}

	onMount(() => {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		if (mainContainer) {
			mainContainer.scrollTop = 0;
			handleScroll();
			mainContainer.addEventListener("scroll", handleScroll);
			mainContainer.addEventListener("wheel", handleWheel, { passive: false });
		}

		return () => {
			if (mainContainer) {
				mainContainer.removeEventListener("scroll", handleScroll);
				mainContainer.removeEventListener("wheel", handleWheel);
			}
		};
	});
</script>

<main bind:this={mainContainer}>
	<BackgroundImage scrollOffset={scrollTop} />
	<LoadScreen />
	<MouseEffects />

	<div class="pages">
		<section id="page-0">
			<HomePage />
		</section>
		<section id="page-1">
			<ProjectsPage repos={data.repos} />
		</section>
		<section id="page-2">
			<SocialsPage />
		</section>
	</div>

	<BottomNav onnavigate={handleNavigate} />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}

	.pages {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: auto;
	}

	section {
		width: 100vw;
		height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}
</style>
