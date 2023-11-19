<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"

	import { user } from "$lib/scripts/stores/UserStore"
	import { playlists } from "$lib/scripts/library/PlaylistsStore"

	import type { APIForm } from "$lib/scripts/api/types"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import PlaylistTrackField from "$lib/components/field/playlist-track-field.svelte"
	import TrackPicker from "$lib/components/track-picker/track-picker.svelte"

	let trackPicker: TrackPicker

	const dispatch = createEventDispatcher()
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	export let currentPlaylistID: string

	let _playlistForm: APIForm<Playlist>
	let _playlistTrackForms: APIForm<PlaylistTrack>[]
	let _palette: Palette = Palette.gray

	$: resetFields(currentPlaylistID)

	function resetFields(playlistID: string) {
		_playlistForm = {
			userID: $user.id,
			data: { ...$playlists.get(playlistID) },
			action: "UPDATE"
		}

		_playlistTrackForms = _playlistForm.data.tracklist.map((playlistTrack) => {
			return {
				data: { ...playlistTrack },
				action: "UPDATE",
				userID: $user.id
			}
		})

		_palette = Palette.parse(_playlistForm.data.palette)
	}

	async function save() {
		_playlistForm.data.palette = _palette.toString()

		await playlists.update(_playlistForm)
		await playlists.upsertTracks(_playlistForm.data.id, [..._playlistTrackForms])
		close()
	}

	function moveTrackUp(index: number) {
		let moved = _playlistTrackForms[index - 1]
		_playlistTrackForms[index - 1] = _playlistTrackForms[index]
		_playlistTrackForms[index] = moved
	}

	function moveTrackDown(index: number) {
		let moved = _playlistTrackForms[index + 1]
		_playlistTrackForms[index + 1] = _playlistTrackForms[index]
		_playlistTrackForms[index] = moved
	}

	function openPicker() {
		trackPicker.open()
	}

	function addTrack(trackID: string) {
		const newTrack = {
			data: {
				id: trackID,
				index: _playlistForm.data.tracklist.length
			},
			action: "INSERT",
			userID: $user.id
		} satisfies APIForm<PlaylistTrack>

		_playlistTrackForms = [..._playlistTrackForms, newTrack]
	}

	function removeTrack(index: number) {
		if (_playlistTrackForms[index].action === "INSERT") {
			_playlistTrackForms = _playlistTrackForms.toSpliced(index, 1)
			return
		}

		_playlistTrackForms[index].action = "DELETE"
		_playlistTrackForms = _playlistTrackForms
	}

	function handlePick(e: CustomEvent) {
		e.detail.tracks.forEach((trackID: string) => {
			addTrack(trackID)
		})
	}

	function close() {
		dispatch("close")
	}
</script>

{#if currentPlaylistID}
	<header class="header">
		<section class="info">
			<Textbox
				id="{_playlistForm.data.id}_title"
				bind:value={_playlistForm.data.title}
				label="Title"
			/>
			<Textbox
				id="{_playlistForm.data.id}_description"
				bind:value={_playlistForm.data.description}
				label="Description"
			/>

			<div class="btns">
				<BtnText label="Save" on:click={save} />
				<BtnText label="Cancel" on:click={close} />
			</div>
		</section>
		<section class="cover">
			<CoverField
				cover={_playlistForm.data.cover}
				bind:file={_playlistForm.file}
				bind:palette={_palette}
			/>
		</section>
	</header>
	{#each _playlistTrackForms as playlistTrackForm, index (playlistTrackForm.data.id)}
		<div
			in:receive={{ key: playlistTrackForm.data.id }}
			out:send={{ key: playlistTrackForm.data.id }}
			animate:flip={{ duration: 200 }}
		>
			<PlaylistTrackField
				{index}
				bind:playlistTrackForm
				atStart={index === 0}
				atEnd={index === _playlistTrackForms.length - 1}
				on:moveup={() => {
					moveTrackUp(index)
				}}
				on:movedown={() => {
					moveTrackDown(index)
				}}
				on:remove={() => {
					removeTrack(index)
				}}
			/>
		</div>
	{/each}
	<BtnText label="add" on:click={openPicker} />
	<TrackPicker bind:this={trackPicker} on:submit={handlePick} />
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
