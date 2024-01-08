<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"

	import type { PlaylistTrackForm } from "$lib/scripts/api/PlaylistAPI"
	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"

	const dispatch = createEventDispatcher()

	export let pickForm: PlaylistTrackForm
	export let index: number
	export let atStart: boolean
	export let atEnd: boolean

	const track = $tracks.get(pickForm.trackID)
	const cover = $albums.get(track.albumID).cover.small

	$: pickForm.index = index

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

<div class="wrapper">
	<span class="cover">
		<img src={cover} alt={`cover for ${track.title}`} />
	</span>
	<div class="info">
		<h3 class="title">{track.title}</h3>
		<h4 class="artist">{track.artists}</h4>
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
		@include mixins.clickable;
		display: flex;
		width: 100%;
		border-radius: 5px;
		padding: 10px;
		box-sizing: border-box;
		align-items: center;
		gap: 10px;

		.cover {
			@include mixins.faint-shadow;
			height: 40px;
			width: 40px;
			border: 1px solid transparent;
			img {
				height: inherit;
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
			align-items: center;
			justify-content: center;
		}
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				width: 60px;
			}
		}
	}
</style>
