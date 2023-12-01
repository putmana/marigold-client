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
		flex-shrink: 0;

		box-sizing: border-box;
		height: 70px;
		margin: 0px 5px;
		padding: 0px 10px;

		border-radius: 5px;

		.cover {
			@include mixins.faint-shadow;

			width: 50px;
			height: 50px;
			border: 1px solid transparent;

			img {
				height: inherit;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			flex-grow: 1;

			margin-left: 20px;
			margin-right: 20px;

			h2,
			h3 {
				@include mixins.clamp-text(2);
				margin-top: 2px;
				margin-bottom: 2px;

				font-weight: normal;
				font-size: 16px;

				overflow: hidden;
			}

			h3 {
				font-size: small;
			}
		}

		&.selected {
			height: 80px;

			margin: 0px;
			padding-left: 15px;

			background-color: var(--primary-medium);

			border: 1px solid colors.$border-hover;
			border-radius: 0px;

			.info {
				h2,
				h3 {
					opacity: 100%;
				}
			}

			.cover {
				border: 1px solid colors.$border-hover;
			}

			&:hover,
			&:focus {
				box-shadow: none;
			}

			@include mixins.desktop-only {
				border-right: none;
			}
		}
	}
</style>
