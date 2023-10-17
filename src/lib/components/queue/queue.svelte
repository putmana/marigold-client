<script lang="ts">
	import {
		currentTrack,
		initialized,
		nextTracks,
		prevTracks,
		queueRepeatMode
	} from "$lib/scripts/stores/PlayerStore"
	import QueueItem from "./queue-item.svelte"

	export let showNow = true

	$: upNext = $queueRepeatMode === "ALL" ? [...$nextTracks, ...$prevTracks] : [...$nextTracks]
</script>

{#if $initialized}
	<div class="wrapper">
		{#if showNow}
			<section class="now">
				<h1 class="queue-label">Now Playing</h1>
				<QueueItem trackID={$currentTrack} />
			</section>
		{/if}
		{#if upNext.length > 0}
			<section class="next">
				<h1 class="queue-label">Up Next</h1>
				{#each upNext as track}
					<QueueItem trackID={track} />
				{/each}
			</section>
		{/if}
	</div>
{/if}

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;

		.queue-label {
			display: flex;
			align-items: center;
			height: 45px;
			padding: 0px 15px 0px 15px;
			margin: 0px;
			font-size: inherit;
			text-transform: uppercase;
		}
	}
</style>
