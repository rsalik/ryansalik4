<script lang="ts">
	import Waves from '$lib/components/Waves.svelte';
	import Fade from '$lib/components/Fade.svelte';
	import { bkg } from '$lib/stores';

	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import ProjectCarousel from '$lib/components/ProjectCarousel.svelte';

	let show = false;
	let showProjContent = false;

	onMount(() => {
		show = true;
	});
</script>

<svelte:window
	on:scroll={() => {
		/* The Projects title is technically on screen when the window
		 * is unscrolled and since the fade-out animation will play on page load,
		 * it is visible for a moment. This hack avoids that */
		if (window.scrollY > window.innerHeight * 0.07) {
			showProjContent = true;
		}
	}}
/>

{#if show}
	<section class="home">
		<div class="header">
			<div class="title" in:fade={{ duration: 600, delay: 200 }}>Ryan Salik</div>
			<div class="subtitle" in:fade={{ duration: 300, delay: 600 }}>Programmer</div>
		</div>

		<Waves />
	</section>

	<section class="sec-projects">
		{#if showProjContent}
			<Fade>
				<div class="section-title nib">Projects</div>
			</Fade>

			<div in:fade={{ duration: 600 }} style:z-index={100}>
				<ProjectCarousel />
			</div>
		{/if}

		<Waves color={$bkg} startingHeight={0.85} inverse />
	</section>

	<section class="contact">
		<Fade>
			<div class="section-title nib">Contact</div>
		</Fade>

		<div class="links">
			<Fade>
				Email: <a href="mailto:rssalik14@gmail.com" class="mono">rssalik14@gmail.com</a>
			</Fade>

			<Fade>
				GitHub: <a href="https://github.com/rsalik" class="mono">rsalik</a>
			</Fade>
		</div>

		<footer>ryansalik.com</footer>
	</section>
{/if}

<style lang="scss">
	.home {
		font-size: 3em;

		position: relative;

		align-items: center;
		justify-content: center;

		.title {
			position: relative;

			margin-top: -1.6em;
		}

		.subtitle {
			font-size: 0.5em;

			position: relative;

			margin-top: -0.8em;

			text-align: right;

			@media screen and (max-width: $mobile) {
				font-size: 0.6em;

				margin-top: -0.5em;
			}
		}
	}

	.sec-projects {
		margin-top: -5vh;
		padding-top: 0;

		color: $bkg;
		background: linear-gradient(to bottom, mix($accent, #fff, 85%), $accent);
	}

	.contact {
		background: mix($bkg, #000, 60%);

		.links {
			z-index: 100;
			@media screen and (max-width: $mobile) {
				font-size: 1.2em;

				padding: 0 2em;
			}
		}

		footer {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;

			@media screen and (max-width: $mobile) {
				display: none;
			}
		}
	}
</style>
