<script lang="ts">
	import FinderItem from "$lib/components/finder/finder-item.svelte"
import Finder from "$lib/components/finder/finder.svelte"
	import { loadAlbums } from "./albums"
	import { onMount } from "svelte"
	
	let albums: Album[] = []

	onMount(async () => {
		albums = await loadAlbums()
	})
</script>

<Finder title="Albums">
	{#each albums as album}
		<FinderItem id={album.id} title={album.title} author={album.artist.name} cover={album.cover} palette={album.palette}></FinderItem>
	{/each}
</Finder>
