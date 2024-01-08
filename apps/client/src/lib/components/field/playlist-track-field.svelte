<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import type { APIForm } from "$lib/scripts/api/types"
	import { tracks } from "$lib/scripts/library/TracksStore"

	const dispatch = createEventDispatcher()

	export let playlistTrackForm: APIForm<PlaylistTrack>
	export let index: number
	export let atStart: boolean
	export let atEnd: boolean

	let _track = $tracks.get(playlistTrackForm.data.id)

	$: playlistTrackForm.data.index = index

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

<div class="wrapper" class:deleted={playlistTrackForm.action === "DELETE"}>
	<div class="index">
		{#if !atStart}
			<BtnIconSeamless src="public/icons/caret-up.svg" on:click={moveUp} />
		{/if}
		{#if !atEnd}
			<BtnIconSeamless src="public/icons/caret-down.svg" on:click={moveDown} />
		{/if}
	</div>
	<div class="info">
		<h3 class="title">{_track.title}</h3>
		<h4 class="artist">{_track.artists}</h4>
	</div>

	<div class="end">
		<BtnIconSeamless src="public/icons/play.svg" />
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
			gap: 5px;
			height: 20px;
			width: 60px;
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

		&.deleted {
			opacity: 50%;
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
