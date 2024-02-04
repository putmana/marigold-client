<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconText from "$lib/components/button/btn-icon-text.svelte"
	import BtnIcon from "$lib/components/button/btn-icon.svelte"

	import { pluralize } from "$lib/scripts/utils"
	import { openAlbumEditorModal } from "./edit/album-editor.svelte"
	import { openTrackUploaderModal } from "$lib/components/track-uploader/track-uploader.svelte"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

	const dispatch = createEventDispatcher()

	export let album: Album

	$: details = `Album 
		• ${album.year} 
		• ${album.tracklist.length} ${pluralize(album.tracklist.length, "track", "tracks")}
	`

	function play() {
		dispatch("play")
	}
</script>

<header class="wrapper" style={album.palette.toCSS()}>
	<section class="info">
		<div class="details">
			<h1 class="title">{album.title}</h1>
			<p>{album.artists}</p>
			<p>{details}</p>
		</div>

		<div class="header-btns">
			{#if album.tracklist.length === 0}
				<BtnIconText
					label="Upload Tracks"
					src="public/icons/upload.svg"
					alt="Upload icon"
					on:click={() => openTrackUploaderModal(album.id)}
				/>
			{:else}
				<ButtonIcon src="public/icons/play.svg" text="Play" alt="Play" on:click={play} />
				<ButtonIcon
					src="public/icons/upload.svg"
					alt="Upload icon"
					on:click={() => openTrackUploaderModal(album.id)}
				/>
			{/if}
			<ButtonIcon
				src="public/icons/edit.svg"
				alt="Edit icon"
				on:click={() => openAlbumEditorModal(album)}
			/>
		</div>
	</section>
	<section class="cover">
		<div class="img-wrapper">
			<img src={album.cover.large} alt={`cover for ${album.title}`} />
		</div>
	</section>
</header>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/colors";

	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		box-sizing: border-box;
		border-bottom: vars.$item_border;

		@include mixins.desktop-only {
			justify-content: space-between;
			padding: 4rem;
			gap: 4rem;
		}

		@include mixins.mobile-only {
			padding: 2rem;
			gap: 2rem;

			flex-direction: column-reverse;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: vars.$item_gap;

		.title {
			font-size: 3rem;
			margin: 0;
		}

		.details {
			opacity: 80%;

			p {
				font-size: 1rem;
				margin: 0;
			}
		}

		.header-btns {
			display: flex;
			gap: vars.$item_gap;
		}
	}

	.cover {
		display: flex;
		justify-content: center;
		.img-wrapper {
			width: 15rem;
			height: 15rem;
			img {
				display: block;
				max-width: 100%;
				box-shadow: vars.$item_shadow;
			}
		}
	}
</style>
