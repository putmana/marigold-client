<script lang="ts">
    import { mode } from "../../../../../stores/mode";
    import { deckColors } from "../../../../../stores/colors";
    import ColorEngine from "../../../../../scripts/color_engine";
    import TrackList from "../shared/track-list.svelte";
    import Void from "../shared/void.svelte";
    import { onDestroy } from "svelte";
    import TrackItem from "../shared/track-item.svelte";
    import AlbumHeader from "./album-header.svelte";
    
    $: album = loadAlbums($mode.content_id)

    async function loadAlbums(id: string | boolean) {
        if (!id) { return false }
        return await fetch('http://localhost/api/album/' + id)
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as AlbumTracks;
            }).then((album) => {
                $deckColors = new ColorEngine(album.info.cover.color)
                return album
            })
    }

    onDestroy(() => {
        $mode.content_id = false;
    })

</script>

{#await album}
    <Void text="loading..."/>
{:then album}
    {#if !album}
        <Void text="No album selected"/>
    {:else}
        <TrackList>
            <AlbumHeader album={album.info} count={album.tracks.length}/>
            {#each album.tracks as track, index}
                <TrackItem track={track} position={index + 1}/>
            {/each}
        </TrackList>
    {/if}
{:catch error}
    <Void text="something went wrong: {error}" type="ERROR"/> 
{/await}

