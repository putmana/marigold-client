<script lang="ts">
    import { detach, onMount } from "svelte/internal";
    import Panel from "./subcomponents/panel.svelte";
    import { current } from "../../stores/view-albums";
    import Void from "./subcomponents/void.svelte";
    import AlbumTracks from "./album-tracks.svelte";
    import Loading from "./subcomponents/loading.svelte";
    import AlbumItem from "./subcomponents/album-item.svelte";
    import ListHeader from "./subcomponents/list-header.svelte";
    
    let albums: Album[] = [];

    onMount(async () => {
        const response = await fetch('http://localhost/api/album');
        const data = await response.json();

        albums = data.data as Album[];
    })
    
    // Returns true if store $current is the ID of a valid playlist
    $: valid = function() {
        let ids = albums.map(p => p.id)
        if (ids.includes($current)) {
            return true
        }
        return false
    }

</script>

<Panel>
    <ListHeader label="ALBUMS"/>
    {#each albums as album}
        <AlbumItem album={album}/>
    {:else}
        <Loading/>
    {/each}
</Panel>

{#if valid()}
    <AlbumTracks/>
{:else}
    <Void/>
{/if}