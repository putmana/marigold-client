<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"
	import { v4 as uuid } from "uuid"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import TrackField from "$lib/components/field/track-field.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"

	import { user } from "$lib/scripts/stores/UserStore"
	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"

	import type { APIForm } from "$lib/scripts/api/types"
	import { Palette } from "$lib/scripts/color-engine/palette"

	const dispatch = createEventDispatcher()
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	export let currentAlbumID: string

	let _albumForm: APIForm<Album>
	let _trackForms: APIForm<Track>[]
	let _palette: Palette = Palette.gray

	$: resetFields(currentAlbumID)

	function resetFields(albumID: string) {
		_albumForm = {
			userID: $user.id,
			data: { ...$albums.get(albumID) },
			action: "UPDATE"
		}

		_trackForms = _albumForm.data.trackIDs.map((trackID) => {
			return {
				data: { ...$tracks.get(trackID) },
				action: "UPDATE",
				userID: $user.id
			}
		})

		_palette = Palette.parse(_albumForm.data.palette)
	}

	async function save() {
		_albumForm.data.palette = _palette.toString()

		await albums.update(_albumForm)
		await tracks.upsert([..._trackForms])
		close()
	}

	function close() {
		dispatch("close")
	}

	function moveTrackUp(index: number) {
		let moved = _trackForms[index]
		_trackForms[index] = _trackForms[index - 1]
		_trackForms[index - 1] = moved
	}

	function moveTrackDown(index: number) {
		let moved = _trackForms[index]
		_trackForms[index] = _trackForms[index + 1]
		_trackForms[index + 1] = moved
	}

	function addTrack() {
		const newTrack = {
			data: {
				id: uuid(),
				title: "",
				artists: _albumForm.data.artists,
				duration: 0,
				index: _trackForms.length,
				albumID: currentAlbumID,
				file: ""
			},
			action: "INSERT",
			userID: $user.id
		} satisfies APIForm<Track>

		_trackForms = [..._trackForms, newTrack]
	}

	function removeTrack(index: number) {
		if (_trackForms[index].action === "INSERT") {
			_trackForms = _trackForms.toSpliced(index, 1)
			return
		}

		_trackForms[index].action = "DELETE"
		_trackForms = _trackForms
	}

	function restoreTrack(index: number) {
		_trackForms[index].action = "UPDATE"
		_trackForms = _trackForms
	}
</script>

{#if currentAlbumID}
	<header class="header">
		<section class="info">
			<Textbox id="{_albumForm.data.id}_title" bind:value={_albumForm.data.title} label="Title" />
			<Textbox
				id="{_albumForm.data.id}_artists"
				bind:value={_albumForm.data.artists}
				label="Artists"
			/>

			<div class="btns">
				<BtnText label="Save" on:click={save} />
				<BtnText label="Cancel" on:click={close} />
			</div>
		</section>
		<section class="cover">
			<CoverField
				cover={_albumForm.data.cover}
				bind:file={_albumForm.file}
				bind:palette={_palette}
			/>
		</section>
	</header>

	{#each _trackForms as trackForm, index (trackForm.data.id)}
		<div
			in:receive={{ key: trackForm.data.id }}
			out:send={{ key: trackForm.data.id }}
			animate:flip={{ duration: 200 }}
		>
			<TrackField
				{index}
				bind:trackForm
				atStart={index === 0}
				atEnd={index === _trackForms.length - 1}
				on:moveup={() => {
					moveTrackUp(index)
				}}
				on:movedown={() => {
					moveTrackDown(index)
				}}
				on:remove={() => {
					removeTrack(index)
				}}
				on:restore={() => {
					restoreTrack(index)
				}}
			/>
		</div>
	{/each}
	<BtnText label="add" on:click={addTrack} />
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
