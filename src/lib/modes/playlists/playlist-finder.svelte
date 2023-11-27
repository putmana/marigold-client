<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { playlists } from "$lib/scripts/stores/LibraryStore"

	import FinderItem from "$lib/components/finder/finder-item.svelte"

	let dispatch = createEventDispatcher()

	export let currentPlaylistID: string

	function selectPlaylist(playlistID: string) {
		currentPlaylistID = playlistID
		dispatch("select")
	}
</script>

{#each [...$playlists] as [playlistID, playlist]}
	<FinderItem
		id={playlistID}
		title={playlist.title}
		cover={playlist.cover}
		palette={playlist.palette}
		selected={playlistID == currentPlaylistID}
		on:select={() => {
			selectPlaylist(playlistID)
		}}
	/>
{/each}
