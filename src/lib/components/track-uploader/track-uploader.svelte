<script lang="ts" context="module">
	import TrackUploader from "./track-uploader.svelte"

	export function openTrackUploaderModal(albumID: string) {
		openModal<TrackUploader>({
			component: TrackUploader,
			props: {
				albumID: albumID
			},
			title: "Upload Tracks",
			loading: false,
			progress: 0
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 as uuid } from "uuid"
	import { parseBlob as parseMetadata } from "music-metadata-browser"

	import TrackUploaderTrack from "./track-uploader-track.svelte"

	import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI"
	import { AudioAPI } from "$lib/scripts/api/AudioAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { albums, library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "../modal-manager/modal-manager.svelte"
	import Button from "$lib/ui/button/button.svelte"
	import Icon from "$lib/ui/icon/icon.svelte"

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	const dispatch = createEventDispatcher()

	export let albumID: string
	export let loading = false
	export let progress = 0

	let input: HTMLInputElement
	let uploads: { form: TrackForm; file: File }[] = []

	$: empty = uploads.length === 0

	async function loadFiles(e: Event) {
		uploads = []

		const input = e.target as HTMLInputElement
		const files = input.files

		for (let i = 0; i < files?.length; i++) {
			const metadata = await parseMetadata(files[i])

			const form: TrackForm = {
				id: uuid(),
				title: metadata.common.title ?? "",
				artists: metadata.common.artists?.toString() ?? "",
				duration: Math.round(metadata.format.duration),
				index: metadata.common.track.no ?? 1,
				albumID: albumID
			}

			const file: File = files[i]

			uploads.push({ form, file })
		}

		uploads = uploads.sort((a, b) => a.form.index - b.form.index)

		console.log(uploads)
	}

	function openFileBrowser() {
		input.click()
	}

	function moveTrackUp(index: number) {
		let moved = uploads[index]
		uploads[index] = uploads[index - 1]
		uploads[index - 1] = moved
	}

	function moveTrackDown(index: number) {
		let moved = uploads[index]
		uploads[index] = uploads[index + 1]
		uploads[index + 1] = moved
	}

	function removeTrack(index: number) {
		uploads = uploads.toSpliced(index, 1)
	}

	async function submit() {
		loading = true

		try {
			const album = $albums.get(albumID)

			for (let i = 0; i < uploads.length; i++) {
				const upload = uploads[i]

				progress = (i + 1 / uploads.length) * 100

				// Make sure the tracks are appended to the end of the album
				upload.form.index = upload.form.index + album.tracklist.length

				// Upload the audio file
				await AudioAPI.upload(upload.file, upload.form.id, $user.id)

				// Create the track in database
				await TrackAPI.create(upload.form)
			}

			// Load changes and close the modal
			await library.load()
			close()
		} catch (error) {
			console.error(error)
		}

		loading = false
	}

	function close() {
		dispatch("close")
	}
</script>

<div class="content">
	<form class="form" on:submit|preventDefault={submit}>
		<input
			bind:this={input}
			class="input"
			type="file"
			id="audio-files"
			name="audio-files"
			accept="audio/*"
			multiple
			required
			on:change={loadFiles}
		/>
		<div class="tracks">
			{#each uploads as upload, index (upload.form.id)}
				<div
					in:receive={{ key: upload.form.id }}
					out:send={{ key: upload.form.id }}
					animate:flip={{ duration: 200 }}
				>
					<TrackUploaderTrack
						bind:trackForm={upload.form}
						{index}
						atStart={index === 0}
						atEnd={index === uploads.length - 1}
						on:moveup={() => moveTrackUp(index)}
						on:movedown={() => moveTrackDown(index)}
						on:remove={() => removeTrack(index)}
					/>
				</div>
			{:else}
				<div class="empty">
					<h1 class="placeholder">No files selected</h1>
					<Button on:click={openFileBrowser}>
						<Icon src="public/icons/upload.svg" alt="Upload icon" />
						<span>Upload tracks</span>
					</Button>
				</div>
			{/each}
		</div>
		{#if !empty}
			<div class="footer">
				<Button on:click={openFileBrowser}>
					<Icon src="public/icons/upload.svg" alt="Upload icon" />
					<span>Replace tracks</span>
				</Button>
				<Button submit>Save</Button>
			</div>
		{/if}
	</form>
</div>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/mixins";

	.content {
		width: min(90svw, 35rem);

		form {
			display: flex;
			flex-direction: column;
			gap: vars.$form_gap;

			width: 100%;

			.input {
				width: 0px;
				height: 0px;
				opacity: 0px;
			}

			.tracks {
				@include mixins.item;

				display: flex;
				flex-direction: column;
				gap: vars.$item_gap;
				padding: vars.$item_gap;

				max-height: min(70svh, 50rem);

				border: vars.$item_border;
				border-radius: vars.$item_border_radius;

				overflow-y: scroll;

				.empty {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					height: min(50svh, 30rem);

					.placeholder {
						opacity: 70%;
						font-weight: normal;
						font-style: italic;
					}
				}
			}

			.footer {
				display: flex;
				justify-content: space-between;
				gap: vars.$form_gap;
			}
		}
	}
</style>
