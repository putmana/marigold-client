<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { covers } from "$lib/scripts/stores/LibraryStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	const dispatch = createEventDispatcher()

	export let title: string
	export let description: string
	export let coverID: string

	$: _cover = $covers.get(coverID)

	$: palette = Palette.parse(_cover.palette)

	function play() {
		dispatch("play")
	}

	function openEditor() {
		dispatch("edit")
	}
</script>

<header class="wrapper" style={palette.toCSS()}>
	<section class="info">
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
		<div class="header-btns">
			<button class="play-btn" on:click={play}>
				<img src="public/icons/play.svg" alt="Play icon" /> play</button
			>
			<button class="play-btn" on:click={openEditor}
				><img src="public/icons/edit.svg" alt="Edit icon" /></button
			>
		</div>
	</section>
	<section class="cover">
		<div class="img-wrapper">
			<img src={_cover.fileLarge} alt={`cover for ${title}`} />
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
		padding-top: 0px;
		gap: 20px;
		border-bottom: 1px solid colors.$border;
	}

	.info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 8px;
		justify-content: center;

		.title {
			font-size: clamp(25pt, 4vw, 50pt);
			font-weight: 900;
			letter-spacing: -1px;
			margin: 0;
		}
		.description {
			opacity: 80%;
			margin: 0;
		}
		.header-btns {
			margin-top: 10px;

			button {
				@include mixins.button;
				img {
					width: 10px;
					height: 10px;
				}
			}
		}
	}

	.cover {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		.img-wrapper {
			max-width: 200px;
			max-height: 200px;
			box-shadow: 0px 0px 30px colors.$shadow;
			img {
				width: 100%;
				height: 100%;
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
