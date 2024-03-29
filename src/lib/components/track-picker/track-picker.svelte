<script lang="ts" context="module">
	import TrackPicker from "./track-picker.svelte"

	export function openTrackPickerModal(playlistID: string) {
		openModal<TrackPicker>({
			component: TrackPicker,
			props: {
				playlistID: playlistID
			},
			title: "Add Tracks",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 as uuid } from "uuid"

	import BtnText from "../button/btn-text.svelte"
	import Textbox from "../textbox/textbox.svelte"
	import TrackPickerTrack from "./track-picker-track.svelte"
	import TrackPickerResult from "./track-picker-result.svelte"

	import { PlaylistAPI, type PlaylistTrackForm } from "$lib/scripts/api/PlaylistAPI"

	import { library, playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "../modal-manager/modal-manager.svelte"

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	const dispatch = createEventDispatcher()

	export let playlistID: string
	export let loading = false

	let query = ""
	let picks: PlaylistTrackForm[] = []

	let results: string[] = []

	$: empty = picks.length === 0

	$: pool = Array.from($tracks.values())
	$: results = pool
		// Only return tracks that have titles or artists that include the query
		.filter((track) => {
			return (
				track.title.toLowerCase().includes(query.toLowerCase()) ||
				track.artists.toLowerCase().includes(query.toLowerCase())
			)
		})
		.map((track) => track.id)
		.slice(0, 10)

	function pickTrack(id: string) {
		const form: PlaylistTrackForm = {
			id: uuid(),
			trackID: id,
			playlistID: playlistID,
			index: picks.length
		}

		picks.push(form)

		picks = picks
	}

	function moveTrackUp(index: number) {
		let moved = picks[index]
		picks[index] = picks[index - 1]
		picks[index - 1] = moved
	}

	function moveTrackDown(index: number) {
		let moved = picks[index]
		picks[index] = picks[index + 1]
		picks[index + 1] = moved
	}

	function removeTrack(index: number) {
		picks = picks.toSpliced(index, 1)
	}

	async function submit() {
		loading = true

		try {
			const playlist = $playlists.get(playlistID)

			for (let i = 0; i < picks.length; i++) {
				const pick = picks[i]

				// Make sure the tracks are appended to the end of the playlist
				pick.index = pick.index + playlist.tracklist.length

				// Add track to playlist in database
				await PlaylistAPI.addTrack(pick)
			}

			// Load changes and close the modal
			await library.load()
			close()
		} catch (error) {
			console.error(error)
		}

		loading = false
	}

	export function close() {
		dispatch("close")
	}

	// <---- RESPONSIVENESS ---->
	let desktop = false
	let innerWidth = 0
	let showSelected = false

	$: desktop = innerWidth > 800
</script>

<div class="content">
	<div class="row">
		{#if !showSelected || desktop}
			<section class="column">
				<Textbox id="fuzzyfind" bind:value={query} label="Search tracks" />
				<div class="scrollbox">
					{#each results as id}
						<TrackPickerResult
							trackID={id}
							on:click={() => {
								pickTrack(id)
							}}
						/>
					{/each}
				</div>
			</section>
		{/if}
		{#if showSelected || desktop}
			<section class="column">
				<div class="scrollbox">
					{#each picks as pick, index (pick.id)}
						<div
							in:receive={{ key: pick.id }}
							out:send={{ key: pick.id }}
							animate:flip={{ duration: 200 }}
						>
							<TrackPickerTrack
								pickForm={pick}
								{index}
								atStart={index === 0}
								atEnd={index === picks.length - 1}
								on:moveup={() => moveTrackUp(index)}
								on:movedown={() => moveTrackDown(index)}
								on:remove={() => removeTrack(index)}
							/>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</div>

	<div class="footer">
		{#if !desktop}
			{#if showSelected}
				<BtnText
					label="Search"
					on:click={() => {
						showSelected = false
					}}
				/>
			{:else}
				<BtnText
					label="Selected Tracks"
					on:click={() => {
						showSelected = true
					}}
				/>
			{/if}
		{:else}
			<BtnText label="Cancel" on:click={close} />
		{/if}
		{#if !empty}
			<BtnText label="Save" on:click={submit} />
		{/if}
	</div>
</div>

<svelte:window bind:innerWidth />

<style lang="scss">
	@use "src/style/colors";
	@use "src/style/mixins";
	.content {
		display: flex;
		flex-direction: column;
		gap: 20px;

		.row {
			display: flex;
			gap: 20px;

			.column {
				display: flex;
				flex-direction: column;
				gap: 15px;

				width: min(300px, 100svw);
				height: min(60svh, 800px);

				.scrollbox {
					@include mixins.faint-shadow;
					display: flex;
					flex-direction: column;

					height: 100%;
					padding: 5px;

					background-color: colors.$gray-d;

					border: 1px solid colors.$border;
					border-radius: 5px;

					overflow-y: scroll;
				}
			}
		}
		.footer {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
