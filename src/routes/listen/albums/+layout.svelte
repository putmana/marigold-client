<script lang="ts">
    import Panel from "$lib/components/panel/panel.svelte";
    import ListHeader from "$lib/components/panel/subcomponents/list-header.svelte";
    import ListItem from "$lib/components/panel/subcomponents/list-item.svelte";
    import { formatArtists } from "$lib/scripts/utils";

    $: albums = loadAlbums()
    async function loadAlbums() {
        return await fetch('http://localhost/api/album/')
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as Album[]
            }).then ((albums) => {
                return albums
            })
    }

</script>

<Panel>
    {#await albums}
    {:then albums}
    <ListHeader label="Albums"/>

        {#each albums as album}
            <ListItem route={"/listen/albums/"+album.id} title={album.title} artists={formatArtists(album.artists)} cover={album.cover.path}/>
        {/each}
    {/await}
</Panel>

<slot></slot>