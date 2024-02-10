<script lang="ts" context="module">
	import PlaylistEditor from "./playlist-editor.svelte"

	export function openPlaylistEditorModal(playlist: Playlist) {
		openModal<PlaylistEditor>({
			component: PlaylistEditor,
			props: {
				playlist: playlist
			},
			title: "Edit Playlist Details",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import Textbox from "$lib/ui/textbox/textbox.svelte"
	import Textarea from "$lib/ui/textbox/textarea.svelte"
	import Button from "$lib/ui/button/button.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"

	import { PlaylistAPI, type PlaylistForm } from "$lib/scripts/api/PlaylistAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "$lib/components/modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let playlist: Playlist
	export let loading = false

	let form: PlaylistForm = {
		id: playlist.id,
		title: playlist.title,
		description: playlist.description,
		palette: playlist.palette
	}

	let file: File | undefined

	async function submit() {
		loading = true

		try {
			// Update the playlist in the database
			await PlaylistAPI.update(form)

			// Upload a cover if a new one is provided
			if (file) {
				await CoverAPI.upload(file, form.id, $user.id)
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
		<CoverField cover={playlist.cover} bind:palette={form.palette} bind:file required={false} />
		<Textbox id="title" label="Title" bind:value={form.title} grow />
		<Textarea id="description" label="Description" bind:value={form.description} grow />

		<div class="footer">
			<Button submit>
				<span>Save</span>
			</Button>
		</div>
	</form>
</div>

<style lang="scss">
	.content {
		width: 20rem;

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
