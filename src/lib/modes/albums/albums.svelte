<script lang="ts">
	import { onMount } from "svelte"

	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import Lister from "$lib/components/lister/lister.svelte"

	import { albums, selectedAlbumID } from "$lib/scripts/library/library"
	import { fetchAlbums, parseAlbums } from "./albums"
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"
	import { pb } from "$lib/scripts/database/pocketbase"
	import ListerHeader from "$lib/components/lister/lister-header.svelte"
	import ListerItem from "$lib/components/lister/lister-item.svelte"

	let hidden = true

	$: current = $albums.find((album) => album.id === $selectedAlbumID)
	$: color = current ? current.palette : defaultColor

	// Load the initial albums
	onMount(() => {
		fetchAlbums().then((data) => {
			$albums = parseAlbums(data.records, data.token)
		})
	})

	// Refresh albums if database entries change
	pb.collection("albums").subscribe("*", () => {
		fetchAlbums().then((data) => {
			$albums = parseAlbums(data.records, data.token)
		})
	})

	// Component functions
	function selectAlbum(album: Album) {
		$selectedAlbumID = album.id
		hidden = false
	}

	function formatDescription(album: Album) {
		return album.artist.name
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
		<ListerHeader
			title={current.title}
			cover={current.cover}
			color={current.palette}
			description={formatDescription(current)}
		/>
		{#each current.tracks as track}
			<ListerItem {track} showCover={true} />
		{/each}
	{/if}
</Lister>
