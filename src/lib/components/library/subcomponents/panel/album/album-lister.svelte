<script lang="ts">
    import { formatArtists } from "../../../../../scripts/utils";
    import ListHeader from "../../../../library/subcomponents/panel/shared/list-header.svelte";
    import ListItem from "../shared/list-item.svelte";
    import Loader from "../shared/loader.svelte";
    
    $: albums = loadAlbums()

    async function loadAlbums() {
        return await fetch('https://marigoldapi_s.ptmn.io/api/album/')
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as Album[]
            }).then ((albums) => {
                return albums
            })
    }

</script>


{#await albums}
    <Loader/>
    {:then albums}
        <ListHeader label="ALBUMS"/>
        {#each albums as album}
            <ListItem id={album.id} title={album.title} artists={formatArtists(album.artists)} cover={album.cover.path}/>
        {/each}
    {:catch error}

{/await}

