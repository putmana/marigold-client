<script lang="ts">
	import BtnIconSeamless from "$lib/components/button/btn-icon-seamless.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums, covers, tracks } from "$lib/scripts/stores/LibraryStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let trackID: string
	export let index: number
	export let atStart: boolean
	export let atEnd: boolean

	$: _track = $tracks.get(trackID)
	$: _album = $albums.get(_track?.albumID)
	$: _cover = $covers.get(_album?.coverID)

	$: palette = Palette.parse(_cover?.palette)

	function moveUp() {
		dispatch("moveup")
	}

	function moveDown() {
		dispatch("movedown")
	}

	function remove() {
		dispatch("remove")
	}
</script>

<div class="wrapper" style={palette.toCSS()}>
	<div class="index">
		{#if !atStart}
			<BtnIconSeamless src="public/icons/caret-up.svg" on:click={moveUp} />
		{/if}
		{#if !atEnd}
			<BtnIconSeamless src="public/icons/caret-down.svg" on:click={moveDown} />
		{/if}
	</div>
	<div class="cover">
		<img src={_cover?.fileSmall} alt={`cover for ${_track.title}`} />
	</div>
	<div class="info">
		<h3 class="title">{_track.title}</h3>
		<h4 class="artist">{_track.artists}</h4>
	</div>
	<div class="end">
		<BtnIconSeamless src="public/icons/trash.svg" on:click={remove} />
	</div>
</div>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 5px;
		align-items: center;
		background-color: colors.$item;
		border: 1px solid colors.$border;

		.index {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 20px;
			width: 60px;
		}

		.cover {
			margin-right: 20px;
			height: 40px;
			width: 40px;
			border: 1px solid var(--secondary-border);
			img {
				height: inherit;
			}

			@include mixins.mobile-only {
				display: none;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			justify-content: center;

			.title {
				all: unset;
			}
			.artist {
				all: unset;
				opacity: 80%;
				font-size: smaller;
			}
		}

		.end {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0px 15px;
			gap: 5px;
		}
	}
</style>
