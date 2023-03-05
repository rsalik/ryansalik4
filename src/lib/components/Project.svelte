<script lang="ts">
	import type projects from '$lib/projects.json';

	export let project: (typeof projects)[0];

	export let disableShadowTransition = false;
</script>

<a
	href="/project/{project.id}"
	class="project"
	draggable={false}
	class:no-transition={disableShadowTransition}
>
	<div class="img" style="--url: url('{project.image}')" />
	<div class="name mono">{project.name}</div>

	<div class="description">{project.description}</div>
</a>

<style lang="scss">
	.project {
		display: flex;
		flex-direction: column;

		height: 14.5em;
		padding: 0.5em;

		transition: box-shadow 0.4s ease-in-out;
		text-decoration: none;

		box-shadow: 0 7px 28px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.08);

		@extend %border-radius;

		&.no-transition {
			transition: none;
		}

		&:hover {
			box-shadow: 0 7px 28px rgba(0, 0, 0, 0.25), 0 5px 10px rgba(0, 0, 0, 0.2);
		}

		@media screen and (max-width: $mobile) {
			font-size: 2em;
		}
	}

	.img {
		width: 9em;
		height: 9em;

		background-image: linear-gradient($accent, $accent), var(--url);
		background-image: var(--url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: auto 101%;

		@extend %border-radius;

		@media screen and (max-width: $mobile) {
			width: 7em;
			height: 7em;
		}
	}

	.name {
		font-size: 0.8em;

		margin: 0.7em 0 0.3em;
	}

	.description {
		font-size: 0.55em;

		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;

		text-overflow: '...';

		-webkit-line-clamp: 5;
		        line-clamp: 5;

		@media screen and (max-width: $mobile) {
			-webkit-line-clamp: 7;
			        line-clamp: 7;
		}
	}
</style>
