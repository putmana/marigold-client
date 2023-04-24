<script lang="ts">
    import Deck from "$lib/components/deck/deck.svelte";
    import TrackHeaderEditor from "$lib/components/deck/subcomponents/track-header-editor.svelte";
    import TrackHeader from "$lib/components/deck/subcomponents/track-header.svelte";
    import TrackItem from "$lib/components/deck/subcomponents/track-item.svelte";
    import Void from "$lib/components/deck/subcomponents/void.svelte";
    import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config.js";
    import { getAlbumTracks } from "$lib/scripts/api/api-albums.js";
    import { buildPalette } from "$lib/scripts/palette.js";
    import { addToQueue, startQueue } from "$lib/scripts/queue.js";
    import { formatArtists, sumDuration } from "$lib/scripts/utils.js";
    import { token } from "$lib/stores/auth.js";
    import { deckPalette } from "$lib/stores/colors.js";
    import { queueStage } from "$lib/stores/player.js";

    export let data;

    $: album = getAlbumTracks($token, data.id).then(album => {
        $deckPalette = buildPalette(album.info.cover.color)
        return album;
    }).catch(error => {
        if (error.message === "BAD TOKEN") {
            $token = UNAUTHORIZED_TOKEN
        }
        throw new Error(error)
    })

    function queueThisList(tracks: Track[], position: number) {
        $queueStage = startQueue(tracks, position)
    }

    function queueThisTrack(track: Track) {
        $queueStage = addToQueue([track])
    }

</script>
<Deck>
    {#await album}
        <Void text="loading..."/>
    {:then album}
        <TrackHeaderEditor 
            id={album.info.id}
            title={album.info.title}
            artists={formatArtists(album.info.artists)}
            category={album.info.category}
            count={album.tracks.length}
            duration={sumDuration(album.tracks)}
            cover={album.info.cover.path}
        />
        {#each album.tracks as track, index}
            <TrackItem track={track} position={index + 1} showArt={false} on:queuethislist={() => queueThisList(album.tracks, index)} on:queuethistrack={() => queueThisTrack(track)}/>
        {/each}
    {:catch error}
        <Void text={error}/>
    {/await}
</Deck>