<script lang="ts">
    import Deck from "$lib/components/deck/deck.svelte";
    import TrackHeader from "$lib/components/deck/subcomponents/track-header.svelte";
    import TrackItem from "$lib/components/deck/subcomponents/track-item.svelte";
    import Void from "$lib/components/deck/subcomponents/void.svelte";
    import { buildPalette } from "$lib/scripts/palette.js";
    import { addToQueue, startQueue } from "$lib/scripts/queue.js";
    import { sumDuration } from "$lib/scripts/utils.js";
    import { deckPalette } from "$lib/stores/colors.js";
    import { queueStage } from "$lib/stores/player.js";

    export let data;

    $: playlist = loadPlaylists(data.id)

    async function loadPlaylists(id: string) {
        return await fetch('http://localhost/api/playlist/' + id)
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as PlaylistTracks;
            }).then((playlist) => {
                $deckPalette = buildPalette(playlist.info.cover.color)
                return playlist
            })
        
    }

    function queueThisList(tracks: Track[], position: number) {
        $queueStage = startQueue(tracks, position)
    }

    function queueThisTrack(track: Track) {
        $queueStage = addToQueue([track])
    }

</script>
<Deck>
    {#await playlist}
        <Void text="loading..."/>
    {:then playlist}
        <TrackHeader 
            title={playlist.info.title}
            artists={playlist.info.username}
            category="Playlist"
            count={playlist.tracks.length}
            duration={sumDuration(playlist.tracks)}
            cover={playlist.info.cover.path}
        />
        {#each playlist.tracks as track, index}
            <TrackItem track={track} position={index + 1} on:queuethislist={() => queueThisList(playlist.tracks, index)} on:queuethistrack={() => queueThisTrack(track)}/>
        {/each}
    {/await}
</Deck>