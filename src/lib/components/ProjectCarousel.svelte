<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';

	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/projects.json';

	// Make TypeScript happy
	const amountShown = 7;

	let activeProjs: (typeof projects[0])[] = projects.slice(0, 4);

	let i = 0;
	let left = -150;

	let hover = false;
	let mouseDown = false;

	let touchStartX = 0;
	let touchStartLeft = 0;

	let refs = [] as HTMLDivElement[];

	function updateCarousel() {
		if (!hover) left -= 1;
	}

	function onLeftChange() {
		if (refs[1]?.getBoundingClientRect().left < 0) {
			left = refs[1]?.getBoundingClientRect().left;

			i = (i + 1) % projects.length;
		}

		if (refs[0]?.getBoundingClientRect().left > 0) {
			// get margin right of first element in pixels
			const marginRight = parseInt(
				getComputedStyle(refs[0]).getPropertyValue('margin-right').replace('px', '')
			);

			left = -refs[0]?.getBoundingClientRect().width - marginRight + 1;

			i = (((i - 1) % projects.length) + projects.length) % projects.length;
		}

		// Ensure that if elements are shifted and the user is dragging, the drag 
		// does not cause the carousel to revert to its pre-shifted position.
		touchStartLeft = left;
		touchStartX = -1;
	}

	function onIndexChange() {
		if (i < projects.length - amountShown) {
			activeProjs = projects.slice(i, i + amountShown);
		} else {
			activeProjs = projects.slice(i).concat(projects.slice(0, amountShown - (projects.length - i)));
		}
	}

	$: left, onLeftChange();
	$: i, onIndexChange();

	function handleDrag(e: MouseEvent | TouchEvent) {
		if (!mouseDown) return;

		if (e instanceof TouchEvent) {
			if (touchStartX === -1) {
				touchStartX = e.touches[0].clientX;
			}

			left = touchStartLeft + (e.touches[0].clientX - touchStartX);
		}

		if (e instanceof MouseEvent) {
			left += e.movementX;
		}
	}

	let interval: NodeJS.Timeout;
	onMount(() => {
		interval = setInterval(updateCarousel, 10);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<svelte:window
	on:mouseup={() => (mouseDown = false)}
	on:touchend={() => {
		mouseDown = false;
		hover = false;
	}}
	on:mousemove={handleDrag}
	on:touchmove={handleDrag}
/>

<div
	class="wrapper"
	on:mouseenter={() => {
		hover = true;
	}}
	on:mouseleave={() => {
		hover = false;
		mouseDown = false;
	}}
	on:mousedown={() => {
		mouseDown = true;
	}}
	on:touchstart={(e) => {
		mouseDown = true;
		hover = true;
		touchStartLeft = left;
		touchStartX = e.touches[0].clientX;
	}}
>
	<div class="carousel" class:grab={mouseDown}>
		{#each activeProjs as proj, i}
			<div class="project-wrapper" style:left="{left}px" bind:this={refs[i]}>
				<Project disableShadowTransition={mouseDown} project={proj} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		z-index: 100;

		display: flex;
		justify-content: center;
	}

	.carousel {
		position: relative;

		display: flex;

		width: 100vw;

		cursor: grab;

		&.grab {
			cursor: grabbing;
		}

		.project-wrapper {
			position: relative;

			margin-right: 0.5em;

			user-select: none;
		}
	}
</style>
