<script lang="ts">
    import { mode } from "../../../../../stores/mode";
    import { deckColors } from "../../../../../stores/colors";
    import ColorEngine from "../../../../../scripts/color_engine";
    import TrackList from "../shared/track-list.svelte";
    import Void from "../shared/void.svelte";
    import { onDestroy } from "svelte";
    import TrackItem from "../shared/track-item.svelte";
    import PlaylistHeader from "./playlist-header.svelte";
    
    $: playlist = loadPlaylists($mode.content_id)

    async function loadPlaylists(id: string | boolean) {
        if (!id) { return false }
        return await fetch('http://localhost/api/playlist/' + id)
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as PlaylistTracks;
            }).then((playlist) => {
                $deckColors = new ColorEngine(playlist.info.cover.color)
                return playlist
            })
        
    }

    onDestroy(() => {
        $mode.content_id = false;
    })

</script>

{#await playlist}
    <Void text="loading..."/>
{:then playlist}
    {#if !playlist}
        <Void text="No playlist selected"/>
    {:else}
        <TrackList>
            <PlaylistHeader playlist={playlist.info} count={playlist.tracks.length}/>
            {#each playlist.tracks as track, index}
                <TrackItem track={track} position={index + 1}/>
            {/each}
        </TrackList>
    {/if}
{:catch error}
    <Void text="something went wrong: {error}" type="ERROR"/> 
{/await}

