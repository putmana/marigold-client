<script lang="ts" context="module">
	import TrackEditor from "./track-editor.svelte"

	export function openTrackEditorModal(track: Track) {
		openModal<TrackEditor>({
			component: TrackEditor,
			props: {
				track: track
			},
			title: "Edit Track Details",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import Textbox from "../textbox/textbox.svelte"
	import BtnText from "../button/btn-text.svelte"

	import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI"

	import { library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "../modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let track: Track

	export let loading = false

	let form: TrackForm = {
		id: track?.id ?? "",
		title: track?.title ?? "",
		artists: track?.artists ?? "",
		duration: track?.duration ?? 0,
		index: track?.index ?? 0,
		albumID: track?.albumID ?? ""
	}

	async function submit() {
		loading = true

		try {
			// Update the track in the database
			await TrackAPI.update(form)

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
		<Textbox id="title" label="Title" bind:value={form.title} />
		<Textbox id="artists" label="Artists" bind:value={form.artists} />
		<div class="footer">
			<BtnText submit label="Save" />
		</div>
	</form>
</div>

<style lang="scss">
	.content {
		width: 300px;

		.form {
			display: flex;
			flex-direction: column;
			gap: 15px;
			width: 100%;

			.footer {
				display: flex;
				justify-content: space-between;
				justify-content: flex-end;
				gap: 10px;
			}
		}
	}
</style>
