<script lang="ts">
	import { onMount } from "svelte"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import Textarea from "$lib/components/textbox/textarea.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { PlaylistAPI, type PlaylistForm } from "$lib/scripts/api/PlaylistAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"

	export let playlist: Playlist
	export let visible = false

	let form: PlaylistForm
	let file: File | undefined

	onMount(() => {
		form = {
			id: playlist.id,
			title: playlist.title,
			description: playlist.description,
			palette: playlist.palette
		}
	})

	async function submit() {
		await PlaylistAPI.update(form)

		if (file) {
			await CoverAPI.upload(file, form.id, $user.id)
		}

		await library.load()
		close()
	}

	function close() {
		visible = false
	}
</script>

<PopupBox label="Edit Playlist Details" bind:visible on:close={close}>
	<div slot="content" class="content">
		<form class="form" on:submit|preventDefault={submit}>
			<CoverField cover={playlist.cover} bind:palette={form.palette} bind:file required={false} />
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