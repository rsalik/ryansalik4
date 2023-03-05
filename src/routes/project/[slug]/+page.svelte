<script lang="ts">
	import ProjectLink from '$lib/components/ProjectLink.svelte';
	import IconNext from '$lib/svgs/IconNext.svelte';
	import IconPrev from '$lib/svgs/IconPrev.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { project, prev, next } = data;

	$: {
		project = data.project;
		prev = data.prev;
		next = data.next;
	}
</script>

<svelte:head>
	{#if project === undefined}
		<title>Ryan Salik - 404: Not Found</title>
	{:else}
		<title>Ryan Salik - {project.name}</title>
	{/if}
</svelte:head>

{#if project === undefined}
	<h1 class="mono">404: Not Found</h1>
{:else}
	<header>
		<div><a href="/">ryansalik.com</a> <span>/ project</span><span>/ {project.id}</span></div>
	</header>

	<section>
		<div class="wrapper">
			<div class="text">
				<div class="name nib">{project.name}</div>

				<div class="nav">
					{#if prev !== undefined}
						<ProjectLink project={prev}>
							<div class="btn"><div><IconPrev /></div></div>
						</ProjectLink>
					{/if}
                    <div style:width=".5rem"></div>
					{#if next !== undefined}
						<ProjectLink project={next}>
							<div class="btn"><div><IconNext /></div></div>
						</ProjectLink>
					{/if}
				</div>
				<div class="desc">{project.description}</div>

				<div class="btns">
					<a class="btn repo mono" href={project.repoLink}> Repository </a>

					{#if project.webLink.includes('heroku')}
						<div class="btn web mono disabled">Visit</div>
						<div class="heroku mono">
							Heroku has disabled free-tier dynos, so this project is currently unavailable online.
						</div>
					{:else}
						<a class="btn web mono" href={project.webLink}>Visit</a>
					{/if}
				</div>
			</div>
			<div>
				<img src={project.image} alt={project.name} />
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		height: calc(100vh - $header-height);
		padding-top: 1.5rem;
	}

	.wrapper {
		display: flex;

		@media screen and (max-width: $mobile) {
			flex-direction: column-reverse;

			padding: 0 2rem;
		}
	}

	.text {
		padding-right: 2rem;
	}

	.name {
		font-size: 2em;

		margin-bottom: 0.3rem;

		@media screen and (max-width: $mobile) {
			font-size: 2.8em;
		}
	}

	.desc {
		font-size: 0.8em;

		margin-top: 0.5rem;

		@media screen and (max-width: $mobile) {
			font-size: 1em;
		}
	}

	.btns {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		margin: 1.5em 0 0.7em;

		$disabled-color: mix($bkg, white, 60%);

		@media screen and (max-width: $mobile) {
			align-items: unset;
			flex-direction: column;
			justify-content: center;
		}

		.btn {
			font-size: 0.8em;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 10em;
			height: 3em;

			transition: all 0.2s ease-in-out;
			text-decoration: none;

			color: $color;
			border: 1px solid $color;

			@extend %border-radius;
			$disabled: repeating-linear-gradient(
			-45deg,
			$disabled-color,
			$disabled-color 1px,
			$bkg 1px,
			$bkg 10px
			);

			@media screen and (max-width: $mobile) {
				font-size: 1.2em;
			}

			&:hover {
				color: $bkg;
				background: $color;
			}

			&.web {
				margin-left: 0.5em;

				color: $accent;
				border-color: $accent;

				@media screen and (max-width: $mobile) {
					margin-top: 0.5em;
					margin-left: 0;
				}

				&:hover {
					color: $bkg;
					background: $accent;
				}
			}

			&.disabled {
				color: $disabled-color;
				border-color: $disabled-color;
				background: $disabled;

				&:hover {
					cursor: not-allowed;

					color: $disabled-color;
					border-color: $disabled-color;
					background: $disabled;
				}
			}
		}

		.heroku {
			font-size: 0.6em;

			width: 100%;
			margin-top: 1em;

			color: rgb(255, 77, 77);

			@media screen and (max-width: $mobile) {
				font-size: 0.8em;
			}
		}
	}

	.nav {
		display: flex;
		align-items: center;

		.btn {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 1.5em;
			height: 1.5em;

			transition: all 0.2s ease-in-out;

			color: $accent;
			border: 0.1em solid $accent;
			border-radius: 50%;

			> div {
				width: 70%;
				height: 70%;
			}

			@media screen and (max-width: $mobile) {
				font-size: 1.5em;
			}

			&:hover {
				color: $bkg;
				background: $accent;
			}
		}
	}

	img {
		width: 40vw;
		height: auto;

		box-shadow: 0 0 0.5rem #0008;

		@extend %border-radius;

		@media screen and (max-width: $mobile) {
			width: 100%;
			margin-bottom: 1.5em;
		}
	}
</style>
