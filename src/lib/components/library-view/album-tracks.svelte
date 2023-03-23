<script lang="ts">
    import { current } from "../../stores/view-albums";
    import { deckColors } from "../../stores/colors";
    import { emptyQueue, queue, unique } from "../../stores/player";
    import Deck from "./subcomponents/deck.svelte";
    import TrackItem from "./subcomponents/track-item.svelte";
    import ColorEngine from "../../scripts/color_engine";
    import TrackList from "./subcomponents/track-list.svelte";
    import Void from "./subcomponents/void.svelte";
    import TrackHeader from "./subcomponents/album-header.svelte";
    import { fly } from "svelte/transition";

    $: album = loadAlbums($current)

    async function loadAlbums(id: string) {
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
    
    function startQueue(tracks: Track[], index: number) {
        $queue = $emptyQueue;
        $queue.tracks = tracks;
        $queue.position = index;
        $unique = Symbol();
    }

    // Adds the duration of all tracks and returns the length of the album in minutes
    let calcDuration = (tracks: Track[]): number => {
        let dur: number = 0;
        tracks.forEach((track: Track) => {
            dur += track.duration;
        });
        return dur;
    }

</script>
    
{#await album}
    <Void text="loading..."/>
{:then album}
    <Deck>
        <TrackList>
            <TrackHeader album={album.info} count={album.tracks.length} duration={calcDuration(album.tracks)}/>
            {#each album.tracks as track, i}
                <TrackItem track={track} position={i + 1} showArt={false} on:sendToQueue={() => {startQueue(album.tracks, i)}}/>
            {/each}
        </TrackList>
    </Deck>
{:catch error}
    <Void text={"something went wrong"+ error} />
{/await}

<style lang="scss">

</style>