<script lang="ts">
	import { formatArtists } from "$lib/scripts/utils"
	import Searcher from "../searcher/searcher.svelte"

	export let albums: Album[]

	let selected: Album | undefined

	let itemizedAlbums: SearchItem[] = albums.map((album) => {
		return {
			id: album.id,
			label: album.title,
			sublabel: formatArtists(album.artists),
			image: album.cover.path
		}
	})

	function handleSelect(e: CustomEvent) {
		selected = albums.find((album) => album.id === e.detail.id)
	}
</script>

<Searcher name="album" items={itemizedAlbums} on:select={handleSelect} />
