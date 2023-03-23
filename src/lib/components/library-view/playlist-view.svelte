<script lang="ts">
    import { onMount } from "svelte/internal";
    import PlaylistItem from "./subcomponents/playlist-item.svelte";
    import Panel from "./subcomponents/panel.svelte";
    import { current } from "../../stores/view-playlists";
    import PlaylistTracks from "./playlist-tracks.svelte";
    import Void from "./subcomponents/void.svelte";
    import Loading from "./subcomponents/loading.svelte";
    import ListHeader from "./subcomponents/list-header.svelte";
    let playlists: Playlist[] = [];

    onMount(async () => {
        const response = await fetch('http://localhost/api/playlist');
        const data = await response.json();

        playlists = data.data as Playlist[];
    })
    
    // Returns true if store $current is the ID of a valid playlist
    $: valid = function() {
        let ids = playlists.map(p => p.id)
        if (ids.includes($current)) {
            return true
        }
        return false
    }

</script>

<Panel>
    <ListHeader label="PLAYLISTS"/>
    {#each playlists as playlist}
        <PlaylistItem playlist={playlist}/>
    {:else}
        <Loading/>
    {/each}
</Panel>

{#if valid()}
    <PlaylistTracks/>
{:else}
    <Void/>
{/if}