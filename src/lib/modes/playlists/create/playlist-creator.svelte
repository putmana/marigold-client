<script lang="ts" context="module">
	import PlaylistCreator from "./playlist-creator.svelte"

	export function openPlaylistCreatorModal() {
		openModal<PlaylistCreator>({
			component: PlaylistCreator,
			props: {},
			title: "Create New Playlist",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { v4 as uuid } from "uuid"

	import Textbox from "$lib/ui/textbox/textbox.svelte"
	import Textarea from "$lib/ui/textbox/textarea.svelte"
	import Button from "$lib/ui/button/button.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { PlaylistAPI, type PlaylistForm } from "$lib/scripts/api/PlaylistAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "$lib/components/modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let loading = false

	let form: PlaylistForm = {
		id: uuid(),
		title: "",
		description: "",
		palette: Palette.gray
	}

	let file: File | undefined

	async function submit() {
		loading = true

		try {
			// Create the playlist in the database
			await PlaylistAPI.create(form)

			// Upload the cover for the playlist
			await CoverAPI.upload(file, form.id, $user.id)

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
		<CoverField bind:palette={form.palette} bind:file />
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
