<script lang="ts">
	import { onMount } from "svelte"

	import { v4 as uuid } from "uuid"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { PlaylistAPI, type PlaylistForm } from "$lib/scripts/api/PlaylistAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import Textarea from "$lib/components/textbox/textarea.svelte"

	export let visible = false

	let loading = false

	let form: PlaylistForm
	let file: File | undefined

	onMount(() => {
		form = {
			id: uuid(),
			title: "",
			description: "",
			palette: Palette.gray
		}
	})

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
		visible = false
	}
</script>

<PopupBox title="Create New Playlist" bind:visible bind:loading on:close={close}>
	<div slot="content" class="content">
		<form class="form" on:submit|preventDefault={submit}>
			<CoverField bind:palette={form.palette} bind:file />
			<Textbox id="title" label="Title" bind:value={form.title} />
			<Textarea id="description" label="Description" bind:value={form.description} />

			<div class="footer">
				<BtnText submit label="Save" />
			</div>
		</form>
	</div>
</PopupBox>

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
