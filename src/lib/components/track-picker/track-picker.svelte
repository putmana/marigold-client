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

	import Button from "$lib/ui/button/button.svelte"
	import Textbox from "$lib/ui/textbox/textbox.svelte"

	import { PlaylistAPI, type PlaylistTrackForm } from "$lib/scripts/api/PlaylistAPI"

	import { library, playlists, tracks } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "../modal-manager/modal-manager.svelte"
	import Track from "../track/track.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

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
				<Textbox id="fuzzyfind" bind:value={query} label="Search tracks" grow />
				<div class="scrollbox">
					{#each results as id, index}
						<Track trackID={id} {index} showCover on:click={() => pickTrack(id)} />
					{/each}
				</div>
			</section>
		{/if}
		{#if showSelected || desktop}
			<section class="column">
				<div class="scrollbox">
					{#each picks as pick, index (pick.id)}
						<Track trackID={pick.trackID} {index} showCover>
							<svelte:fragment slot="actions">
								<ButtonIcon
									src="public/icons/close.svg"
									alt="Remove icon"
									tooltip="Remove track"
									nopadding
									seamless
									on:click={() => removeTrack(index)}
								/>
							</svelte:fragment>
						</Track>
					{/each}
				</div>
			</section>
		{/if}
	</div>

	<div class="footer">
		{#if !desktop}
			{#if showSelected}
				<Button
					on:click={() => {
						showSelected = false
					}}
				>
					<span>Search</span>
				</Button>
			{:else}
				<Button
					on:click={() => {
						showSelected = true
					}}
				>
					<span>Show Selected</span>
				</Button>
			{/if}
		{:else}
			<Button on:click={close}>
				<span>Cancel</span>
			</Button>
		{/if}
		{#if !empty}
			<Button on:click={submit}>
				<span>Save</span>
			</Button>
		{/if}
	</div>
</div>

<svelte:window bind:innerWidth />

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/mixins";

	.content {
		display: flex;
		flex-direction: column;
		gap: vars.$form_gap;

		.row {
			display: flex;
			gap: vars.$form_gap;

			.column {
				display: flex;
				flex-direction: column;
				gap: vars.$form_gap;

				width: min(20rem, 100svw);
				height: min(60svh, 50rem);

				.scrollbox {
					@include mixins.item;

					display: flex;
					flex-direction: column;
					gap: vars.$item_gap;
					padding: vars.$item_gap;

					height: 100%;

					border: vars.$item_border;
					border-radius: vars.$item_border_radius;

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
