<script lang="ts">
	import FinderItem from "$lib/components/finder/finder-item.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import { fetchAlbums, getUserToken, parseAlbums } from "./albums"
	import { onMount } from "svelte"

	let token = ""

	$: albums = fetchAlbums().then((albums) => {
		return parseAlbums(albums, token)
	})

	onMount(async () => {
		token = await getUserToken()
	})
</script>

<Finder title="Albums">
	{#await albums then albums}
		{#each albums as album}
			<FinderItem
				id={album.id}
				title={album.title}
				author={album.artist.name}
				cover={album.cover}
				palette={album.palette}
			/>
		{/each}
	{/await}
</Finder>
