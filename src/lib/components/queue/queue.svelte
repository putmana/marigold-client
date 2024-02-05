<script lang="ts">
	import {
		currentTrack,
		initialized,
		nextTracks,
		prevTracks,
		queueRepeatMode
	} from "$lib/scripts/stores/PlayerStore"
	import Track from "../track/track.svelte"

	export let showNow = true

	$: upNext = $queueRepeatMode === "ALL" ? [...$nextTracks, ...$prevTracks] : [...$nextTracks]
</script>

{#if $initialized}
	<div class="wrapper">
		{#if showNow}
			<div class="queue-label">
				<h1>Now Playing</h1>
			</div>
			<div class="list">
				<Track index={0} trackID={$currentTrack} showCover />
			</div>
		{/if}
		{#if upNext.length > 0}
			<div class="queue-label">
				<h1>Up Next</h1>
			</div>
			<div class="list">
				{#each upNext as trackID, index}
					<Track {trackID} {index} showCover />
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/vars";

	.wrapper {
		flex-direction: column;

		box-sizing: border-box;
		width: 20rem;

		.queue-label {
			display: flex;
			align-items: center;
			flex-shrink: 0;

			padding: 0.75rem calc(2 * vars.$item_gap);

			h1 {
				flex-grow: 1;
				margin: 0;
				font-size: 1rem;
			}
		}

		.list {
			display: flex;
			flex-direction: column;
			gap: vars.$item_gap;
			padding: vars.$item_gap;
		}
	}
</style>
