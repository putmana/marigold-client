<script lang="ts">
    import Deck from "$lib/components/deck/deck.svelte";
    import TrackHeader from "$lib/components/deck/subcomponents/track-header.svelte";
    import TrackItem from "$lib/components/deck/subcomponents/track-item.svelte";
    import Void from "$lib/components/deck/subcomponents/void.svelte";
    import ListItem from "$lib/components/panel/subcomponents/list-item.svelte";
    import { buildPalette } from "$lib/scripts/palette.js";
    import { addToQueue, startQueue } from "$lib/scripts/queue.js";
    import { formatArtists, sumDuration } from "$lib/scripts/utils.js";
    import { deckPalette } from "$lib/stores/colors.js";
    import { queueStage } from "$lib/stores/player.js";

    export let data;

    $: album = loadAlbums(data.id)

    async function loadAlbums(id: string) {
        return await fetch('http://localhost/api/album/' + id)
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as AlbumTracks;
            }).then((album) => {
                $deckPalette = buildPalette(album.info.cover.color)
                return album
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
    {#await album}
        <Void text="loading..."/>
    {:then album}
        <TrackHeader 
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
    {/await}
</Deck>