<script lang="ts">
    import { v4 as uuid } from 'uuid';
    import Deck from "$lib/components/deck/deck.svelte";
    import TrackHeaderEditor from "$lib/components/deck/subcomponents/track-header-editor.svelte";
    import TrackHeader from "$lib/components/deck/subcomponents/track-header.svelte";
    import TrackItemEditor from "$lib/components/deck/subcomponents/track-item-editor.svelte";
    import TrackItemNew from "$lib/components/deck/subcomponents/track-item-new.svelte";
    import TrackItem from "$lib/components/deck/subcomponents/track-item.svelte";
    import Void from "$lib/components/deck/subcomponents/void.svelte";
    import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config.js";
    import { getAlbumTracks, updateAlbum } from "$lib/scripts/api/api-albums.js";
    import { buildPalette } from "$lib/scripts/palette.js";
    import { addToQueue, startQueue } from "$lib/scripts/queue.js";
    import { formatArtists, sumDuration } from "$lib/scripts/utils.js";
    import { token } from "$lib/stores/auth.js";
    import { deckPalette } from "$lib/stores/colors.js";
    import { queueStage } from "$lib/stores/player.js";
    import { goto } from '$app/navigation';

    export let data;

    let newTracks: NewTrack[] = [];
    let albumInfo: Album;
    let albumTracks: Track[];

    $: album = getAlbumTracks($token, data.id).then(album => {
        $deckPalette = buildPalette(album.info.cover.color)
        setAlbum(album)
        return album;
    }).catch(error => {
        if (error.message === "BAD TOKEN") {
            $token = UNAUTHORIZED_TOKEN
        }
        throw new Error(error)
    })

    function setAlbum(album: AlbumTracks) {
        albumInfo = album.info
        albumTracks = album.tracks
    }

    function queueThisList(tracks: Track[], position: number) {
        $queueStage = startQueue(tracks, position)
    }

    function queueThisTrack(track: Track) {
        $queueStage = addToQueue([track])
    }
    
    function handleChange(newTrack: NewTrack, index: number) {
        newTracks[index] = newTrack;
        console.log(newTracks)
    }

    function addNewTrack() {
        newTracks = [
            ...newTracks,
            {
                temp_id: uuid(),
                title: "newTrack" + (newTracks.length + 1),
                artists: formatArtists(albumInfo.artists),
                path: ""
            }
        ]
    }

    async function saveChanges() {
        await updateAlbum($token, albumInfo, albumTracks, newTracks).then(() => {
            goto("/listen/albums/"+data.id)
        }).catch(error => {
            console.error(error);
        }) 
    }


</script>

{#await album}
    <Void text="loading..."/>
{:then album}
    <Deck>
        <TrackHeaderEditor
            id={albumInfo.id}
            bind:title={albumInfo.title}
            artists={formatArtists(albumInfo.artists)}
            bind:category={albumInfo.category}
            count={albumTracks.length}
            duration={sumDuration(albumTracks)}
            cover={albumInfo.cover.path}
            on:save={saveChanges}
        />
        {#each albumTracks as track, index (track.id)}
            <TrackItemEditor 
                track={track} 
                position={index + 1}
                showArt={false} 
                on:queuethislist={() => queueThisList(albumTracks, index)} 
                on:queuethistrack={() => queueThisTrack(track)}/>
        {/each}
        {#each newTracks as newTrack, index (newTrack.temp_id)}
            <TrackItemNew
                track={newTrack}
                position={albumTracks.length + index}
                on:change={ (e) => { handleChange(e.detail.track, index) }}
            />
        {/each}
        <button class="add-track btn btn-secondary" on:click={addNewTrack}>+ new track</button>
    </Deck>
{:catch error}
    <Void text={error}/>
{/await}

<style lang="scss">
    @import '/static/vars.scss';
    @import '/static/buttons.scss';

    .add-track {
        min-height: calc(2.5 * $size);
        margin-left: calc(2 * $margin-size);
        margin-right: calc(2 * $margin-size);
        margin-top: calc(2 * $margin-size);
    }
</style>