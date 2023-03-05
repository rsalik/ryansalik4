<script lang="ts">
	import type projects from '$lib/projects.json';
	import Project from './Project.svelte';

	import { fly } from 'svelte/transition';

	let hover = false;

	export let project: (typeof projects)[0];
</script>

<div class="proj-link" on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
	<slot />
    
	{#if hover}
		<div class="proj-wrapper" transition:fly={{ y: -20, duration: 400 }}>
			<Project {project} />
		</div>
	{/if}
</div>

<style lang="scss">
	.proj-link {
		position: relative;

		.proj-wrapper {
			position: absolute;
			top: 2em;

			background: $bkg;
		}
	}
</style>
