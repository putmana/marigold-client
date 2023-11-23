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
		height: 70px;
		margin: 5px;
		border-radius: 5px;
		padding-left: 10px;
		display: flex;
		align-items: center;
		box-sizing: border-box;

		.cover {
			height: 60px;
			width: 60px;
			box-shadow: 0px 0px 5px colors.$shadow-faint;
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
				margin-top: 2px;
				margin-bottom: 2px;
				font-weight: normal;
				font-size: inherit;
				opacity: 80%;
			}
			h3 {
				font-size: small;
			}
		}

		&.selected {
			margin-left: 0px;
			margin-right: 0px;
			border-radius: 0px;
			height: 90px;
			padding-left: 15px;
			background-color: var(--primary-medium);
			border: 1px solid var(--primary-border);
			margin: 0;

			.info {
				h2,
				h3 {
					opacity: 100%;
				}
			}

			&:hover {
				box-shadow: none;
			}

			@media (min-width: sizes.$screen-lg) {
				border-right-width: 0px;

				&::after {
					content: "";
					box-sizing: border-box;
					border-top: 1px solid var(--primary-border);
					border-bottom: 1px solid var(--primary-border);
					background-color: var(--primary-medium);
					position: absolute;
					height: inherit;
					width: 2px;
					right: -1px;
				}
			}
		}
	}
</style>
