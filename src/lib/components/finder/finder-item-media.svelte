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
	<ul class="info">
		<li class="title">{title}</li>
		{#if artists}
			<li class="artist">{artists}</li>
		{/if}
	</ul>
</FinderItem>

<style lang="scss">
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/vars";

	.cover {
		width: 2.5rem;
		height: 2.5rem;
		isolation: isolate;

		img {
			height: inherit;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		padding: 0 vars.$item_gap;
		margin: 0;
		list-style-type: none;

		.artist {
			color: colors.$text_b;
		}
	}
</style>
