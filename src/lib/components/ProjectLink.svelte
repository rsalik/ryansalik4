<script lang="ts">
	import type projects from '$lib/projects.json';
	import Project from './Project.svelte';

	import { fly } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { mobile } from '$lib/stores';

	let hover = false;

	// After clicking one of the buttons, the mouse must first leave the button
	// before the hover effect can be triggered again.
	let forceMouseLeave = false;

    let width = 0;
	$: isMobile = width < get(mobile);

	export let project: (typeof projects)[0];
</script>

<svelte:window bind:innerWidth={width} />

<a
	class="proj-link"
	href="/project/{project.id}"
	on:click={() => {
		forceMouseLeave = true;
	}}
>
	{#if isMobile}
		<slot />
	{:else}
		<div
			on:focus={() => (hover = true)}
			on:focusout={() => (hover = false)}
			on:mouseover={() => (hover = true)}
			on:mouseleave={() => {
				forceMouseLeave = false;
				hover = false;
			}}
		>
			<slot />
		</div>

		{#if hover && !forceMouseLeave}
			<div class="proj-wrapper" tabindex="-1" transition:fly={{ y: -20, duration: 400 }}>
				<Project {project} />
			</div>
		{/if}
	{/if}
</a>

<style lang="scss">
	.proj-link {
		position: relative;

		.proj-wrapper {
			position: absolute;
			top: 2em;

			background: $gray;

			@extend %border-radius;
		}
	}
</style>
