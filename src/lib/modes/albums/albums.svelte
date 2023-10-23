<script lang="ts">
	import Finder from "$lib/components/finder/finder.svelte"
	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Lister from "$lib/components/lister/lister.svelte"
	import ListerHeader from "$lib/components/lister/lister-header.svelte"
	import ListerItem from "$lib/components/lister/lister-item.svelte"

	import { albums, artists, covers, selectedAlbumID } from "$lib/scripts/stores/LibraryStore"
	import { playerController } from "$lib/scripts/stores/PlayerStore"

	let hidden = true

	$: current = $albums.get($selectedAlbumID)
	$: color = $covers.get(current?.coverID)?.palette ?? ""

	function showFinder() {
		hidden = false
	}

	function selectAlbum(albumID: string) {
		$selectedAlbumID = albumID
		showFinder()
	}

	function formatDescription(album: Album) {
		return $artists.get(album.artistID).name
	}

	function startQueue(index: number) {
		const trackIDs = current.orderedTracks.map((track) => track.id)
		playerController.startQueue(trackIDs, index)
	}
</script>

<Finder title="Albums">
	{#each [...$albums] as [albumID, album]}
		<FinderItem
			id={albumID}
			title={album.title}
			artistID={album.artistID}
			coverID={album.coverID}
			selected={albumID == $selectedAlbumID}
			on:select={() => {
				selectAlbum(albumID)
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
		{#each current.orderedTracks as orderedTrack, index}
			<ListerItem
				{orderedTrack}
				showCover={false}
				on:play={() => {
					startQueue(index)
				}}
			/>
		{/each}
	{/if}
</Lister>
