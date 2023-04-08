<script lang="ts">
    import { mode } from "../../../../../stores/mode";
    import { deckPalette, defaultColor } from "../../../../../stores/colors";
    import TrackList from "../shared/track-list.svelte";
    import Void from "../shared/void.svelte";
    import { onDestroy } from "svelte";
    import TrackItem from "../shared/track-item.svelte";
    import AlbumHeader from "./album-header.svelte";
    import { calculateDuration } from "../../../../../scripts/utils";
    import { queueStage } from "../../../../../stores/player";
    import { addToQueue, startQueue } from "../../../../../scripts/queue";
    import { buildPalette } from "../../../../../scripts/palette";
    
    $: album = loadAlbums($mode.content_id)

    async function loadAlbums(id: string | boolean) {
        if (!id) { return false }
        return await fetch('https://marigoldapi_s.ptmn.io/api/album/' + id)
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as AlbumTracks;
            }).then((album) => {
                $deckPalette = buildPalette(album.info.cover.color)
                return album
            })
    }

    onDestroy(() => {
        $mode.content_id = false;
        $deckPalette = buildPalette(defaultColor);
    })

    function queueThisList(tracks: Track[], position: number) {
        $queueStage = startQueue(tracks, position)
    }

    function queueThisTrack(track: Track) {
        $queueStage = addToQueue([track])
    }

</script>

{#await album}
    <Void text="loading..."/>
{:then album}
    {#if !album}
        <Void text="No album selected"/>
    {:else}
        <TrackList>
            <AlbumHeader album={album.info} count={album.tracks.length} duration={calculateDuration(album.tracks)}/>
            {#each album.tracks as track, index}
                <TrackItem track={track} position={index + 1} on:queuethislist={() => queueThisList(album.tracks, index)} on:queuethistrack={() => queueThisTrack(track)} showArt={false}/>
            {/each}
        </TrackList>
    {/if}
{:catch error}
    <Void text="something went wrong: {error}" type="ERROR"/> 
{/await}

