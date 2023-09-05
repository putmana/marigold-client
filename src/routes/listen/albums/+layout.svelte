<script lang="ts">
	import Panel from "$lib/components/panel/panel.svelte"
	import ListHeader from "$lib/components/panel/subcomponents/list-header.svelte"
	import ListItem from "$lib/components/panel/subcomponents/list-item.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
	import { getAllAlbums } from "$lib/scripts/api/api-albums"
	import { formatArtists } from "$lib/scripts/utils"
	import { token } from "$lib/stores/auth"

	$: albums = getAllAlbums($token).catch((error) => {
		if (error.message === "BAD TOKEN") {
			$token = UNAUTHORIZED_TOKEN
		}
		throw new Error(error)
	})
</script>

<Panel>
	{#await albums then albums}
		<ListHeader label="Albums" />

		{#each albums as album}
			<ListItem
				route={"/listen/albums/" + album.id}
				title={album.title}
				artists={formatArtists(album.artists)}
				cover={album.cover.path}
			/>
		{/each}
	{:catch error}
		<h4>{error}</h4>
	{/await}
</Panel>

<slot />
