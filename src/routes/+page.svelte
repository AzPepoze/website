<script lang="ts">
	import { onMount } from "svelte";
	import BackgroundImage from "$lib/components/BackgroundImage.svelte";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import HomePage from "$lib/components/pages/HomePage.svelte";
	import FeaturedProjectsPage from "$lib/components/pages/FeaturedProjectsPage.svelte";
	import AllReposPage from "$lib/components/pages/AllReposPage.svelte";
	import SocialsPage from "$lib/components/pages/SocialsPage.svelte";
	import LoadScreen from "$lib/components/LoadScreen.svelte";
	import MouseEffects from "$lib/components/MouseEffects.svelte";
	import { page } from "$lib/stores/page";

	let scrollTop = 0;
	let mainContainer: HTMLElement;
	let windowHeight = 0;
	let isScrolling = false;

	function handleScroll() {
		if (!mainContainer) return;
		scrollTop = mainContainer.scrollTop;
		windowHeight = window.innerHeight;

		const currentPage = Math.round(scrollTop / windowHeight);
		page.set(currentPage);

		// High-performance 3D transform updates
		for (let i = 0; i < 4; i++) {
			const sectionTop = i * windowHeight;
			const distance = scrollTop - sectionTop;
			const progress = Math.max(0, Math.min(1, distance / windowHeight));
			mainContainer.style.setProperty(`--p${i}-progress`, progress.toString());
		}
	}

	// The "Old Code" manual scroll logic
	const handleWheel = (e: WheelEvent) => {
		if (!mainContainer || isScrolling) return;

		// Check if we are inside a scrollable element (like the Repo grid)
		let target = e.target as HTMLElement | null;
		while (target && target !== mainContainer) {
			if (target.hasAttribute("data-prevent-page-scroll")) {
				const canScrollUp = target.scrollTop > 0;
				const canScrollDown = target.scrollTop < target.scrollHeight - target.clientHeight;
				if (e.deltaY > 0 && canScrollDown) return;
				if (e.deltaY < 0 && canScrollUp) return;
				break;
			}
			target = target.parentElement;
		}

		e.preventDefault();
		isScrolling = true;

		const direction = e.deltaY > 0 ? 1 : -1;
		const nextPageIndex = Math.max(0, Math.min(3, $page + direction));

		mainContainer.scrollTo({
			top: nextPageIndex * window.innerHeight,
			behavior: "smooth",
		});

		setTimeout(() => {
			isScrolling = false;
		}, 800); // Lock scroll slightly during transition
	};

	function handleNavigate(pageNumber: number) {
		if (!mainContainer) return;
		mainContainer.scrollTo({
			top: pageNumber * window.innerHeight,
			behavior: "smooth",
		});
	}

	onMount(() => {
		windowHeight = window.innerHeight;
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		if (mainContainer) {
			mainContainer.scrollTop = 0;
			handleScroll();
			mainContainer.addEventListener("scroll", handleScroll, { passive: true });
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

<svelte:window bind:innerHeight={windowHeight} />

<main bind:this={mainContainer}>
	<BackgroundImage scrollOffset={scrollTop} />
	<LoadScreen />
	<MouseEffects />

	<div class="pages" style:height="{windowHeight * 4}px">
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
	</div>

	<BottomNav onnavigate={handleNavigate} />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
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
		background-color: var(--sub-bg-color);
		transition: background-color 0.5s ease;
	}

	.stack-section {
		width: 100vw;
		height: 100vh;
		position: sticky;
		top: 0;
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-color);

		/* 3D Stacking Animation */
		--progress: 0;
		--scale: calc(1 - (var(--progress) * 0.15));
		--rotate: calc(var(--progress) * 15deg);
		--opacity: calc(1 - (var(--progress) * 0.8));

		transform: perspective(1200px) rotateX(var(--rotate)) scale(var(--scale));
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
</style>
