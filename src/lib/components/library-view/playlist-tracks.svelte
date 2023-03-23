<script lang="ts">
    import { onMount } from "svelte";
    import { current } from "../../stores/view-playlists";
    import { deckColors } from "../../stores/colors";
    import { queue, unique } from "../../stores/player";
    import Deck from "./subcomponents/deck.svelte";
    import TrackItem from "./subcomponents/track-item.svelte";
    import ColorEngine from "../../scripts/color_engine";
    import TrackList from "./subcomponents/track-list.svelte";
    import Void from "./subcomponents/void.svelte";
    import PlaylistHeader from "./subcomponents/playlist-header.svelte";

    $: playlist = loadPlaylists($current)

    async function loadPlaylists(id: string) {
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

    function startQueue(tracks: Track[], index: number) {
        $queue.tracks = tracks;
        $queue.position = index;
        $unique = Symbol()
    }

    // Adds the duration of all tracks and returns the length of the album in minutes
    let calcDuration = (tracks: Track[]): number => {
        let dur: number = 0;
        tracks.forEach((track: Track) => {
            dur += track.duration;
        });
        return Math.floor(dur / 60);
    }

</script>

{#await playlist}
    <Void text="loading..."/>
{:then playlist}
<Deck>
    <TrackList>
        <PlaylistHeader playlist={playlist.info} count={playlist.tracks.length} duration={calcDuration(playlist.tracks)}/>
        {#each playlist.tracks as track, i}
            <TrackItem track={track} position={i + 1} on:sendToQueue={() => startQueue(playlist.tracks, i)}/>
        {/each}
    </TrackList>
</Deck>
{:catch error}
    <Void text={"something went wrong"+ error} />
{/await}

<style lang="scss">
    
</style>