<script lang="ts">
	import { onMount } from "svelte"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { AlbumAPI, type AlbumForm } from "$lib/scripts/api/AlbumAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"

	export let album: Album
	export let visible = false

	let loading = false

	let form: AlbumForm
	let file: File | undefined

	onMount(() => {
		form = {
			id: album.id,
			title: album.title,
			artists: album.artists,
			year: album.year,
			palette: album.palette
		}
	})

	async function submit() {
		loading = true

		try {
			// Update the album in the database
			await AlbumAPI.update(form)

			// Upload a new cover if one is provided
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
		visible = false
	}
</script>

<PopupBox title="Edit Album Details" bind:visible bind:loading on:close={close}>
	<div slot="content" class="content">
		<form class="form" on:submit|preventDefault={submit}>
			<CoverField cover={album.cover} bind:palette={form.palette} bind:file required={false} />
			<Textbox id="title" label="Title" bind:value={form.title} />
			<Textbox id="artists" label="Artists" bind:value={form.artists} />
			<Textbox id="year" label="Year" bind:value={form.year} />
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
