<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 as uuid } from "uuid"
	import { parseBlob as parseMetadata } from "music-metadata-browser"

	import BtnIconText from "$lib/components/button/btn-icon-text.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"
	import TrackUploaderTrack from "./track-uploader-track.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"

	import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI"
	import { AudioAPI } from "$lib/scripts/api/AudioAPI"
	import { user } from "$lib/scripts/stores/UserStore"
	import Loader from "../loading/loader.svelte"
	import { library } from "$lib/scripts/stores/LibraryStore"

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	export let visible = false
	export let albumID: string

	let input: HTMLInputElement
	let uploads: { form: TrackForm; file: File }[] = []

	let uploading = false

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
		for await (const upload of uploads) {
			await AudioAPI.upload(upload.file, upload.form.id, $user.id)
			await TrackAPI.create(upload.form)
		}
		await library.load()
		close()
	}

	function close() {
		visible = false
		uploading = false
		uploads = []
	}
</script>

<PopupBox label="Upload Tracks" bind:visible on:close={close}>
	<div slot="content" class="content">
		{#if uploading}
			<Loader label="Uploading" />
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
		width: min(90svw, 600px);

		.form {
			display: flex;
			flex-direction: column;
			gap: 15px;

			.input {
				width: 0px;
				height: 0px;
				opacity: 0px;
			}

			.tracks {
				max-height: min(70svh, 800px);
				overflow-y: scroll;
				display: flex;
				flex-direction: column;
				gap: 10px;
				box-sizing: border-box;
				padding: 10px;
				border: 1px solid colors.$border-hover;
				border-radius: 5px;
				background-color: colors.$gray-d;
				box-shadow: inset 0px 0px 5px colors.$shadow-faint;

				.empty {
					height: min(50svh, 400px);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.placeholder {
						opacity: 70%;
						font-weight: normal;
						font-style: italic;
					}
				}
			}

			.footer {
				display: flex;
				justify-content: center;
				justify-content: space-between;
				gap: 10px;
			}
		}
	}
</style>
