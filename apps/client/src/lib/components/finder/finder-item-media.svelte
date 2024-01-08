<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import FinderItem from "$lib/components/finder/finder-item.svelte"

	import type { Palette } from "$lib/scripts/color-engine/palette"

	const dispatch = createEventDispatcher()

	export let id: string
	export let title: string
	export let artists: string | null = null
	export let cover: Cover

	export let selected: boolean
	export let palette: Palette

	function select() {
		dispatch("select", {
			id: id
		})
	}
</script>

<FinderItem {selected} {palette} on:select={select}>
	<span class="cover">
		<img src={cover.small} alt={`Cover for ${title}`} />
	</span>
	<span class="info">
		<h2>{title}</h2>
		{#if artists}
			<h3>{artists}</h3>
		{/if}
	</span>
</FinderItem>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";

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
</style>
