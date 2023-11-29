<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import type { Palette } from "$lib/scripts/color-engine/palette"
	import BtnIcon from "../button/btn-icon.svelte"
	import BtnIconText from "../button/btn-icon-text.svelte"

	const dispatch = createEventDispatcher()

	export let title: string
	export let description: string
	export let cover: Cover
	export let palette: Palette

	function play() {
		dispatch("play")
	}

	function openEditor() {
		dispatch("edit")
	}

	function openUploader() {
		dispatch("upload")
	}
</script>

<header class="wrapper" style={palette.toCSS()}>
	<section class="info">
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
		<div class="header-btns">
			<BtnIconText label="Play" src="public/icons/play.svg" alt="Play icon" on:click={play} />
			<BtnIcon src="public/icons/edit.svg" alt="Edit icon" on:click={openEditor} />
			<BtnIcon src="public/icons/upload.svg" alt="Upload icon" on:click={openUploader} />
		</div>
	</section>
	<section class="cover">
		<div class="img-wrapper">
			<img src={cover.large} alt={`cover for ${title}`} />
		</div>
	</section>
</header>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column-reverse;
		box-sizing: border-box;
		padding: 20px;
		gap: 40px;
		border-bottom: 1px solid colors.$border;
		margin-bottom: 10px;
	}

	.info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;

		.title {
			font-size: clamp(24px, 4vw, 50px);
			font-weight: 900;
			letter-spacing: -1px;
			margin: 0;
			margin-left: -2px;
		}

		.description {
			opacity: 80%;
			font-size: 16px;
			margin: 0;
		}

		.header-btns {
			display: flex;
			gap: 5px;
			margin-top: 15px;
		}
	}

	.cover {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		.img-wrapper {
			width: 200px;
			height: 200px;
			img {
				display: block;
				max-width: 100%;
				box-shadow: 0px 0px 30px colors.$shadow;
			}
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			justify-content: center;
			flex-direction: row;
			padding: 60px;
			gap: 60px;
			flex-wrap: wrap-reverse;
		}

		.cover {
			flex-grow: 0;
			.img-wrapper {
				max-width: 220px;
				max-height: 220px;
			}
		}
	}
</style>
