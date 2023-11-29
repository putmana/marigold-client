<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let id: string
	export let title: string
	export let artists: string | null = null
	export let cover: Cover
	export let palette: Palette
	export let selected: boolean

	function selectItem() {
		dispatch("select", {
			id: id
		})
	}
</script>

<button class="wrapper" class:selected on:click={selectItem} style={palette.toCSS()}>
	<span class="cover">
		<img src={cover.small} alt={`Cover for ${title}`} />
	</span>
	<span class="info">
		<h2>{title}</h2>
		{#if artists}
			<h3>{artists}</h3>
		{/if}
	</span>
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		@include mixins.clickable;

		position: relative;

		display: flex;
		align-items: center;

		box-sizing: border-box;
		height: 70px;
		margin: 5px;
		padding-left: 10px;

		border-radius: 5px;

		.cover {
			@include mixins.faint-shadow;

			width: 60px;
			height: 60px;

			img {
				height: inherit;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;

			margin-left: 20px;

			h2,
			h3 {
				opacity: 80%;

				margin-top: 2px;
				margin-bottom: 2px;

				font-weight: normal;
				font-size: inherit;
			}
			h3 {
				font-size: small;
			}
		}

		&.selected {
			height: 90px;

			margin: 0;
			margin-left: 0px;
			margin-right: 0px;
			padding-left: 15px;

			background-color: var(--primary-medium);

			border: 1px solid var(--primary-border);
			border-radius: 0px;

			.info {
				h2,
				h3 {
					opacity: 100%;
				}
			}

			&:hover,
			&:focus {
				box-shadow: none;
			}

			@media (min-width: sizes.$screen-lg) {
				border-right-width: 0px;

				&::after {
					content: "";

					position: absolute;
					right: -1px;

					box-sizing: border-box;
					width: 2px;
					height: inherit;

					background-color: var(--primary-medium);

					border-top: 1px solid var(--primary-border);
					border-bottom: 1px solid var(--primary-border);
				}
			}
		}
	}
</style>
