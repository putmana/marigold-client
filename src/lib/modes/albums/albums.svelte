<script lang="ts">
	import { loadAlbums } from "./albums"
	import { onMount } from "svelte"

	onMount(async () => {
		const albums = await loadAlbums()
	})
</script>
