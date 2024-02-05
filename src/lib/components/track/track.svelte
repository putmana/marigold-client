<script lang="ts">
	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"

	export let trackID: string
	export let index: number

	$: _track = $tracks.get(trackID)
	$: _cover = $albums?.get(_track.albumID).cover.small

	export let showIndex = false
	export let showCover = false
</script>

<button class="seamless" on:click on:dblclick {...$$restProps}>
	{#if showIndex}
		<div class="index">{index + 1}</div>
	{/if}

	{#if showCover}
		<div class="cover">
			<img src={_cover} alt={`Cover art for ${_track.title}`} />
		</div>
	{/if}

	<ul class="info">
		<li class="title">{_track.title}</li>
		<li class="artist">{_track.artists}</li>
	</ul>

	<div class="actions">
		<slot name="actions" />
	</div>
</button>

<style lang="scss">
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	button {
		@include button.base;

		justify-content: start;
		padding: vars.$item_gap;

		.index {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1rem;

			@include mixins.desktop-only {
				width: calc(4rem - vars.$item_gap);
			}

			@include mixins.mobile-only {
				width: calc(2rem - vars.$item_gap);
			}
		}

		.cover {
			padding: 0 calc(vars.$item_gap * 2) 0 0;
			img {
				display: block;
				width: 2.5rem;
			}
		}

		.info {
			margin: 0;
			padding: 0;
			list-style-type: none;

			.artist {
				color: colors.$text_b;
			}
		}
	}
</style>
