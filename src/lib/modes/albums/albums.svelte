<script lang="ts">
	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import Lister from "$lib/components/lister/lister.svelte"
	import { fetchAlbums, parseAlbums } from "./albums"
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"

	let current: Album | undefined = undefined
	let hidden = true

	$: albums = fetchAlbums().then((data) => {
		return parseAlbums(data.records, data.token)
	})

	$: color = current ? current.palette : defaultColor

	function selectAlbum(album: Album) {
		current = album
		hidden = false
	}
</script>

{#await albums then albums}
	<Finder title="Albums">
		{#each albums as album}
			<FinderItem
				id={album.id}
				title={album.title}
				author={album.artist.name}
				cover={album.cover}
				palette={album.palette}
				selected={album == current}
				on:select={() => {
					selectAlbum(album)
				}}
			/>
		{/each}
	</Finder>
	<Lister bind:hidden bind:color>
		{#if current}
			{#each current.tracks as track}
				<h3>{track.title}</h3>
			{/each}
		{/if}
	</Lister>
{/await}
