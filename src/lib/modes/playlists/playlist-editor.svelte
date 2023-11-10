<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import BtnText from "$lib/components/button/btn-text.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"

	import { playlists } from "$lib/scripts/stores/LibraryStore"
	import { createEventDispatcher } from "svelte"
	import PlaylistEditorTrack from "./playlist-editor-track.svelte"

	const dispatch = createEventDispatcher()

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	export let currentPlaylistID: string

	let coverField: CoverField

	let _id: string = ""
	let _title: string = ""
	let _description: string = ""
	let _coverID: string = ""
	let _tracks: string[] = []

	$: resetFields(currentPlaylistID)

	function resetFields(playlistID: string) {
		const _playlist = $playlists.get(playlistID)

		_id = _playlist?.id ?? ""
		_title = _playlist?.title ?? ""
		_description = _playlist?.description ?? ""
		_coverID = _playlist?.coverID ?? ""
		_tracks = [..._playlist?.trackIDs]
	}

	function moveUp(index: number) {
		let moved = _tracks[index - 1]
		_tracks[index - 1] = _tracks[index]
		_tracks[index] = moved
	}

	function moveDown(index: number) {
		let moved = _tracks[index + 1]
		_tracks[index + 1] = _tracks[index]
		_tracks[index] = moved
	}

	function addTrack(trackID) {
		_tracks = [..._tracks, trackID]
	}

	function removeTrack(index: number) {
		_tracks = _tracks.toSpliced(index, 1)
	}

	function close() {
		dispatch("close")
	}

	async function saveAll() {
		await coverField.save()
		close()
	}
</script>

{#if currentPlaylistID}
	<header class="header">
		<section class="info">
			<Textbox id="{_id}_title" bind:value={_title} label="Title" />
			<Textbox id="{_id}_description" bind:value={_description} label="Description" />

			<div class="btns">
				<BtnText label="Save" on:click={saveAll} />
				<BtnText label="Cancel" on:click={close} />
			</div>
		</section>
		<section class="cover">
			<CoverField bind:this={coverField} coverID={_coverID} />
		</section>
	</header>

	{#each _tracks as trackID, index (trackID)}
		<div in:receive={{ key: trackID }} out:send={{ key: trackID }} animate:flip={{ duration: 200 }}>
			<PlaylistEditorTrack
				{trackID}
				{index}
				atStart={index === 0}
				atEnd={index === _tracks.length - 1}
				on:moveup={() => {
					moveUp(index)
				}}
				on:movedown={() => {
					moveDown(index)
				}}
				on:remove={() => {
					removeTrack(index)
				}}
			/>
		</div>
	{/each}
{/if}

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.header {
		display: flex;
		box-sizing: border-box;
		border-bottom: 1px solid colors.$border;

		@include mixins.mobile-only {
			flex-direction: column-reverse;
			gap: 20px;
			padding: 20px;
		}

		@include mixins.desktop-only {
			justify-content: center;
			padding: 60px;
			gap: 60px;
			flex-wrap: wrap-reverse;
		}

		.info {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: 15px;
			justify-content: center;
		}
	}
</style>
