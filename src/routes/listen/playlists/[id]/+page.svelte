<script lang="ts">
	import Deck from "$lib/components/deck/deck.svelte"
	import TrackHeader from "$lib/components/deck/subcomponents/track-header.svelte"
	import TrackItem from "$lib/components/deck/subcomponents/track-item.svelte"
	import Void from "$lib/components/deck/subcomponents/void.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config.js"
	import { getPlaylistTracks } from "$lib/scripts/api/api-playlists.js"
	import { buildPalette } from "$lib/scripts/palette.js"
	import { addToQueue, startQueue } from "$lib/scripts/queue.js"
	import { sumDuration } from "$lib/scripts/utils.js"
	import { token } from "$lib/stores/auth.js"
	import { deckPalette } from "$lib/stores/colors.js"
	import { queueStage } from "$lib/stores/player.js"

	export let data

	$: playlist = getPlaylistTracks($token, data.id)
		.then((playlist) => {
			$deckPalette = buildPalette(playlist.info.cover.color)
			return playlist
		})
		.catch((error) => {
			if (error.message === "BAD TOKEN") {
				$token = UNAUTHORIZED_TOKEN
			}
			throw new Error(error)
		})

	function queueThisList(tracks: Track[], position: number) {
		$queueStage = startQueue(tracks, position)
	}

	function queueThisTrack(track: Track) {
		$queueStage = addToQueue([track])
	}
</script>

<Deck>
	{#await playlist}
		<Void text="loading..." />
	{:then playlist}
		<TrackHeader
			id={playlist.info.id}
			title={playlist.info.title}
			artists={playlist.info.username}
			category="Playlist"
			count={playlist.tracks.length}
			duration={sumDuration(playlist.tracks)}
			cover={playlist.info.cover.path}
		/>
		{#each playlist.tracks as track, index}
			<TrackItem
				{track}
				position={index + 1}
				on:queuethislist={() => queueThisList(playlist.tracks, index)}
				on:queuethistrack={() => queueThisTrack(track)}
			/>
		{/each}
	{:catch error}
		<Void text={error} />
	{/await}
</Deck>
