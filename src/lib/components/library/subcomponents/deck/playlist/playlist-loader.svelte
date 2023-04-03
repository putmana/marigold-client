<script lang="ts">
    import { mode } from "../../../../../stores/mode";
    import { deckColors } from "../../../../../stores/colors";
    import ColorEngine from "../../../../../scripts/color_engine";
    import TrackList from "../shared/track-list.svelte";
    import Void from "../shared/void.svelte";
    import { onDestroy } from "svelte";
    import TrackItem from "../shared/track-item.svelte";
    import PlaylistHeader from "./playlist-header.svelte";
    import { calculateDuration } from "../../../../../scripts/utils";
    import { queueStage } from "../../../../../stores/player";
    import { addToQueue, startQueue } from "../../../../../scripts/queue";
    
    $: playlist = loadPlaylists($mode.content_id)

    async function loadPlaylists(id: string | boolean) {
        if (!id) { return false }
        return await fetch('https://marigoldapi_s.ptmn.io/api/playlist/' + id)
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

    function queueThisList(tracks: Track[], position: number) {
        $queueStage = startQueue(tracks, position)
    }

    function queueThisTrack(track: Track) {
        $queueStage = addToQueue([track])
    }

</script>

{#await playlist}
    <Void text="loading..."/>
{:then playlist}
    {#if !playlist}
        <Void text="No playlist selected"/>
    {:else}
        <TrackList>
            <PlaylistHeader playlist={playlist.info} count={playlist.tracks.length} duration={calculateDuration(playlist.tracks)}/>
            {#each playlist.tracks as track, index}
                <TrackItem track={track} position={index + 1} on:queuethislist={() => queueThisList(playlist.tracks, index)} on:queuethistrack={() => queueThisTrack(track)}/>
            {/each}
        </TrackList>
    {/if}
{:catch error}
    <Void text="something went wrong: {error}" type="ERROR"/> 
{/await}

