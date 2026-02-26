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
	let windowHeight = $state(0);
	let isScrolling = false;
	const scrollThrottling = 200;

	function handleScroll() {
		if (!mainContainer) return;
		scrollTop = mainContainer.scrollTop;

		const currentPage = Math.round(scrollTop / windowHeight);
		// Avoid redundant store updates
		page.subscribe(($p) => {
			if ($p !== currentPage) page.set(currentPage);
		})();

		// High-performance 3D transform updates
		for (let i = 0; i < 5; i++) {
			const sectionTop = i * windowHeight;
			const distance = scrollTop - sectionTop;
			const progress = Math.max(0, Math.min(1, distance / windowHeight));
			mainContainer.style.setProperty(
				`--p${i}-progress`,
				progress.toString(),
			);
		}
	}

	function handleNavigate(pageNumber: number) {
		if (!mainContainer || isScrolling) return;

		isScrolling = true;
		mainContainer.scrollTo({
			top: pageNumber * windowHeight,
			behavior: "smooth",
		});

		setTimeout(() => {
			isScrolling = false;
		}, scrollThrottling);
	}

	function handleWheel(e: WheelEvent) {
		if (isScrolling) return;

		// Check if target is inside a scrollable container
		if ((e.target as HTMLElement).closest("[data-prevent-page-scroll]")) {
			return;
		}

		const direction = e.deltaY > 0 ? 1 : -1;
		let currentPage = 0;
		page.subscribe(($p) => (currentPage = $p))();

		const nextPage = Math.max(0, Math.min(4, currentPage + direction));

		if (nextPage !== currentPage) {
			handleNavigate(nextPage);
		}
	}

	onMount(() => {
		windowHeight = window.innerHeight;
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		if (mainContainer) {
			mainContainer.scrollTop = 0;
			handleScroll();
			mainContainer.addEventListener("scroll", handleScroll, {
				passive: true,
			});

			mainContainer.addEventListener("wheel", handleWheel, {
				passive: false,
			});

			// Disable touch scroll on mobile
			mainContainer.addEventListener(
				"touchmove",
				(e) => {
					if (
						!(e.target as HTMLElement).closest(
							"[data-prevent-page-scroll]",
						)
					) {
						e.preventDefault();
					}
				},
				{ passive: false },
			);

			// Disable scroll keys
			window.addEventListener(
				"keydown",
				(e) => {
					const scrollKeys = [
						"ArrowUp",
						"ArrowDown",
						"PageUp",
						"PageDown",
						"Home",
						"End",
						" ",
					];
					if (
						scrollKeys.includes(e.key) &&
						!(e.target as HTMLElement).closest(
							"[data-prevent-page-scroll]",
						)
					) {
						e.preventDefault();
						const direction =
							e.key === "ArrowDown" ||
							e.key === "PageDown" ||
							e.key === " "
								? 1
								: -1;
						let currentPage = 0;
						page.subscribe(($p) => (currentPage = $p))();
						handleNavigate(
							Math.max(0, Math.min(4, currentPage + direction)),
						);
					}
				},
				{ passive: false },
			);
		}

		return () => {
			if (mainContainer) {
				mainContainer.removeEventListener("scroll", handleScroll);
				mainContainer.removeEventListener("wheel", handleWheel);
			}
		};
	});
</script>

<svelte:window bind:innerHeight={windowHeight} />

<main bind:this={mainContainer}>
	<BackgroundImage scrollOffset={scrollTop} />
	<LoadScreen />
	<MouseEffects />

	<div class="pages" style:height="{windowHeight * 5}px">
		<section id="page-0" style:z-index="1" class="stack-section">
			<HomePage />
		</section>
		<section id="page-1" style:z-index="2" class="stack-section">
			<FeaturedProjectsPage />
		</section>
		<section id="page-2" style:z-index="3" class="stack-section">
			<AllReposPage />
		</section>
		<section id="page-3" style:z-index="4" class="stack-section">
			<SocialsPage />
		</section>
		<section id="page-4" style:z-index="5" class="stack-section">
			<ContactPage />
		</section>
	</div>

	<BottomNav onnavigate={handleNavigate} />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		overflow: hidden; /* Completely disable manual scroll */
		background-color: var(--bg-color);
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	main::-webkit-scrollbar {
		display: none;
	}

	.pages {
		position: relative;
		width: 100%;
		transition: background-color 0.5s ease;
	}

	.stack-section {
		width: 100vw;
		height: 100vh;
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(var(--bg-color), transparent);

		/* 3D Stacking Animation */
		--progress: 0;
		--scale: calc(1 - (var(--progress) * 0.15));
		--rotate: calc(var(--progress) * 15deg);
		--opacity: calc(1 - (var(--progress) * 0.8));

		transform: perspective(1200px) rotateX(var(--rotate))
			scale(var(--scale));
		opacity: var(--opacity);

		transform-origin: center top;
		will-change: transform, opacity;
	}

	#page-0 {
		--progress: var(--p0-progress, 0);
	}
	#page-1 {
		--progress: var(--p1-progress, 0);
	}
	#page-2 {
		--progress: var(--p2-progress, 0);
	}
	#page-3 {
		--progress: var(--p3-progress, 0);
	}
	#page-4 {
		--progress: var(--p4-progress, 0);
	}
</style>
