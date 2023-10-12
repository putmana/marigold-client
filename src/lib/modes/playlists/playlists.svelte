<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Lister from "$lib/components/lister/lister.svelte"
	import ListerHeader from "$lib/components/lister/lister-header.svelte"
	import ListerItem from "$lib/components/lister/lister-item.svelte"

	import { covers, playlists, selectedPlaylistID } from "$lib/scripts/stores/LibraryStore"

	let hidden = true

	$: current = $playlists.get($selectedPlaylistID)
	$: color = $covers.get(current?.coverID)?.palette ?? ""

	function showFinder() {
		hidden = false
	}

	function selectPlaylist(playlistID: string) {
		$selectedPlaylistID = playlistID
		showFinder()
	}

	function formatDescription(playlist: Playlist) {
		return playlist.description
	}
</script>

<Finder title="Playlists">
	{#each [...$playlists] as [playlistID, playlist]}
		<FinderItem
			id={playlistID}
			title={playlist.title}
			coverID={playlist.coverID}
			selected={playlistID === $selectedPlaylistID}
			on:select={() => {
				selectPlaylist(playlistID)
			}}
		/>
	{/each}
</Finder>
<Lister bind:hidden bind:color>
	{#if current}
		<ListerHeader
			title={current.title}
			coverID={current.coverID}
			description={formatDescription(current)}
		/>
		{#each current.orderedTracks as orderedTrack}
			<ListerItem {orderedTrack} showCover={true} />
		{/each}
	{/if}
</Lister>
