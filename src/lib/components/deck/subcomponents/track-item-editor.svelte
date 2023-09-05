<script lang="ts">
	import { deckPalette } from "$lib/stores/colors"
	import { createEventDispatcher } from "svelte"
	import { formatArtists } from "$lib/scripts/utils"

	export let track: Track
	export let position: number
	export let showArt = true
</script>

<div
	class="track"
	style="--hover-light: {$deckPalette.bright.light}; --hover-dark: {$deckPalette.bright.dark}"
>
	<div class="number">
		<span class="number-text">
			<i class="bi bi-grip-horizontal"></i>
		</span>
	</div>
	{#if showArt}
		<div class="art">
			<img class="art-image" src={track.cover.path} />
		</div>
	{/if}
	<form class="form-control">
		<div class="text-input">
			<label class="text" for="track-title">title</label>
			<input id="track-title" type="text" class="text-title" bind:value={track.title} />
		</div>
		<div class="text-input">
			<label class="text" for="track-artist">artist</label>
			<input
				id="track-artists"
				type="text"
				class="text-artist"
				value={formatArtists(track.artists)}
			/>
		</div>
	</form>
</div>

<style lang="scss">
	@import "/static/vars.scss";
	@import "/static/form-control.scss";

	.track {
		display: flex;
		flex-direction: row;
		min-height: calc($track-item-size + $margin-size * 4);
		align-items: center;
		border: 1px solid transparent;
		border-radius: $margin-size;
		margin-left: calc(2 * $margin-size);
		margin-right: calc(2 * $margin-size);
		transition: background-color $hover-fade-time ease;
		.number {
			display: flex;
			align-items: center;
			height: $track-item-size;
			width: $track-item-size;
			.number-text {
				width: inherit;
				text-align: center;
				font-size: larger;
			}
		}
		form {
			display: flex;
			flex-direction: row;
		}
		.text-input {
			display: flex;
			flex-direction: column;
			margin-right: calc(2 * $margin-size);
			justify-content: center;
		}
		.art {
			margin-right: calc(4 * $margin-size);
			min-height: calc($track-item-art-size);
			.art-image {
				margin: none;
				height: calc($track-item-art-size);
				width: calc($track-item-art-size);
				border-style: solid;
				border-color: $border-color;
				border-width: 1px;
				vertical-align: middle;
			}
		}
		&:hover {
			background-color: $hover-color;
			border-color: $border-color;
		}
	}
</style>
