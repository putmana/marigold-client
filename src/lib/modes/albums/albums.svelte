<script lang="ts">
	import { onMount } from "svelte"

	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import Lister from "$lib/components/lister/lister.svelte"

	import { albums, selectedAlbumID, fetchAlbums, parseAlbums } from "./albums"
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"
	import { pb } from "$lib/scripts/database/pocketbase"

	let hidden = true

	$: current = $albums.find((album) => album.id === $selectedAlbumID)
	$: color = current ? current.palette : defaultColor

	// Refresh albums if database entries change
	pb.collection("albums").subscribe("*", () => {
		fetchAlbums().then((data) => {
			$albums = parseAlbums(data.records, data.token)
		})
	})

	// Component Functions
	onMount(async () => {
		$albums = await fetchAlbums().then((data) => {
			return parseAlbums(data.records, data.token)
		})
	})

	function selectAlbum(album: Album) {
		$selectedAlbumID = album.id
		hidden = false
	}
</script>

<Finder title="Albums">
	{#each $albums as album}
		<FinderItem
			id={album.id}
			title={album.title}
			author={album.artist.name}
			cover={album.cover}
			palette={album.palette}
			selected={album.id == $selectedAlbumID}
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
