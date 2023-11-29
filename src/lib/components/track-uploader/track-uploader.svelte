<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 as uuid } from "uuid"
	import { parseBlob as parseMetadata } from "music-metadata-browser"

	import BtnIconText from "$lib/components/button/btn-icon-text.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"
	import TrackUploaderTrack from "./track-uploader-track.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Loader from "../loading/loader.svelte"
	import ProgressBar from "../progress-bar/progress-bar.svelte"

	import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI"
	import { AudioAPI } from "$lib/scripts/api/AudioAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { albums, library } from "$lib/scripts/stores/LibraryStore"

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	export let visible = false
	export let albumID: string

	let input: HTMLInputElement
	let uploads: { form: TrackForm; file: File }[] = []

	let uploading = false
	let uploadCurrent = 0
	let uploadTotal = 0

	$: empty = uploads.length === 0

	async function loadFiles(e: Event) {
		uploads = []

		const input = e.target as HTMLInputElement
		const files = input.files

		for (let i = 0; i < files?.length; i++) {
			const metadata = await parseMetadata(files[i])

			const form: TrackForm = {
				id: uuid(),
				title: metadata.common.title,
				artists: metadata.common.artists.toString(),
				duration: Math.round(metadata.format.duration),
				index: metadata.common.track.no,
				albumID: albumID
			}

			const file: File = files[i]

			uploads.push({ form, file })
		}

		uploads = uploads.sort((a, b) => a.form.index - b.form.index)
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

	async function submit() {
		uploading = true

		const album = $albums.get(albumID)

		// For progress bar
		uploadCurrent = 0
		uploadTotal = uploads.length

		for (let i = 0; i < uploads.length; i++) {
			const upload = uploads[i]

			// Make sure the tracks are appended to the end of the album
			upload.form.index = upload.form.index + album.tracklist.length

			// Update the progress bar
			uploadCurrent = i + 1

			await AudioAPI.upload(upload.file, upload.form.id, $user.id)
			await TrackAPI.create(upload.form)
		}

		await library.load()

		close()

		uploads = []
		uploading = false
	}

	function close() {
		visible = false
	}
</script>

<PopupBox label="Upload Tracks" bind:visible on:close={close}>
	<div slot="content" class="content">
		{#if uploading}
			<div class="loading">
				<Loader label="Uploading..." />
				<ProgressBar current={uploadCurrent} total={uploadTotal} />
			</div>
		{:else}
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
							/>
						</div>
					{:else}
						<div class="empty">
							<h1 class="placeholder">No files selected</h1>
							<BtnIconText
								src="public/icons/upload.svg"
								label={"Upload Files"}
								on:click={openFileBrowser}
							/>
						</div>
					{/each}
				</div>
				{#if !empty}
					<div class="footer">
						<BtnIconText
							src="public/icons/upload.svg"
							label={"Replace Files"}
							on:click={openFileBrowser}
						/>
						<BtnText submit label="Save" />
					</div>
				{/if}
			</form>
		{/if}
	</div>
</PopupBox>

<style lang="scss">
	@use "src/style/colors";

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(90svw, 600px);

		.loading {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;

			height: 200px;
			width: 200px;
		}

		.form {
			display: flex;
			flex-direction: column;
			gap: 15px;

			width: 100%;

			.input {
				width: 0px;
				height: 0px;
				opacity: 0px;
			}

			.tracks {
				display: flex;
				flex-direction: column;
				gap: 10px;
				overflow-y: scroll;

				box-sizing: border-box;

				max-height: min(70svh, 800px);
				padding: 10px;

				background-color: colors.$gray-d;

				border: 1px solid colors.$border-hover;
				border-radius: 5px;

				.empty {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					height: min(50svh, 400px);

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
				gap: 10px;
			}
		}
	}
</style>
