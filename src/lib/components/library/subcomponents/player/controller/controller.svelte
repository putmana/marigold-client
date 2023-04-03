<script lang="ts">
    import { onMount } from "svelte";
    import ColorEngine from "../../../../../scripts/color_engine";
    import { getQueueTrackPosition } from "../../../../../scripts/queue";
    import { formatArtists, formatTime } from "../../../../../scripts/utils";
    import { playerColors } from "../../../../../stores/colors";
    import { currentTrack, tracksQueued, tracksPlayed, queueStage, position, repeat, shuffle, tracksManual, queueBoxVisible } from "../../../../../stores/player";
    import { current } from "../../../../../stores/view-albums";
    import ScrubBar from "./scrub-bar.svelte";

    let ready = false;

    // <---- AUDIO PLAYER BINDS ---->
    let player: HTMLAudioElement = new Audio();
    let time = 0;
    let duration = 0;
    let paused = true;
    let ended = false;
    let reloader: Symbol = Symbol();
    let src = "";
    let cover = "";
    
    // <---- INTERNAL VALUES ---->
    let sourceTracks: QueueTrack[] = []; 
    // The original sorted list of tracks from the selected album or playlist
    let prevTracks: QueueTrack[] = []; 
    // Previously played tracks in the current session

    let playingTrack: QueueTrack; 
    // The currently playing track

    let nextTracks: QueueTrack[] = []; 
    // The tracks that are up next in the queue

    let manualTracks: QueueTrack[] = []; 
    // Tracks manually added to the queue by the user

    $: title = (ready) ? playingTrack.track.title : ""
    $: artists = (ready) ? formatArtists(playingTrack.track.artists) : ""

    $: player.src = (ready) ? playingTrack.track.path : ""
    $: cover = (ready) ? playingTrack.track.cover.path : ""
    

    // <---- BIND UPDATES ---->
    $: (paused) ? player.pause() : player.play();
    $: if (ended) ($repeat === "ONE") ? restart() : skipNext();

    function shuffleTracks() {
        let hat: QueueTrack[] = [...prevTracks, ...nextTracks]
        let shuffled: QueueTrack[] = []
        
        for (let i = hat.length; i > 0; i--) {
            let r = Math.floor((Math.random() * i))
            shuffled.push(...hat.splice(r, 1))
        }

        nextTracks = shuffled;
        prevTracks = [];
        
    }

    function unshuffleTracks() {
        if (playingTrack.source === "AUTO") {
            let pos = getQueueTrackPosition(sourceTracks, playingTrack.id)
            if (pos != -1) {
                prevTracks = sourceTracks.slice(0, pos)
                nextTracks = sourceTracks.slice(pos + 1, sourceTracks.length)
            } else {
                prevTracks = []
                nextTracks = sourceTracks
                console.warn("Could not find a track with ID " + playingTrack.id + " (" + playingTrack.track.title + ")")
            }
        } else {
            prevTracks = []
            nextTracks = sourceTracks
            console.warn("Unshuffled while in manual queue")
        }
    }

    // <---- LISTENERS ---->

    $: if (!$queueStage.seen) {
        processStage()
        store()
    }

    
    function processStage() {
        ready = true;

        console.log($queueStage)
        if ($queueStage.flag === "START") {
            sourceTracks = $queueStage.tracks;
            prevTracks = $queueStage.tracks.slice(0, $queueStage.position)
            nextTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length);
            playingTrack = $queueStage.tracks[$queueStage.position]

            if ($shuffle) {
                shuffleTracks()
            }
            paused = false;
            reload()
    
        } else if ($queueStage.flag === "ADD") {
            manualTracks.push(...$queueStage.tracks)
            store()

        } else if ($queueStage.flag === "REORDER") {
            prevTracks = ($queueStage.tracks.slice(0, $queueStage.position)).filter(track => track.source === "AUTO");
            console.log(prevTracks)
            nextTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length).filter(track => track.source === "AUTO");
            manualTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length).filter(track => track.source === "MANUAL");
            playingTrack = $queueStage.tracks[$queueStage.position]
            reload()

        } else if ($queueStage.flag === "DIE") {
            prevTracks = []
            nextTracks = []
            playingTrack = null
            ready = false;
        }

        $queueStage.seen = true;
        store()
    }


    

    // <---- CONTROL FUNCTIONS ---->
    function store() {
        $tracksQueued = nextTracks;
        $tracksPlayed = prevTracks;
        $currentTrack = playingTrack;
        $tracksManual = manualTracks;
    }

    function reload() {
        reloader = Symbol()
        player.load()
        $playerColors = new ColorEngine(playingTrack.track.cover.color);
        store()
    }

    function play() {
        paused = false;
        store()
    }

    function pause() {
        paused = true;
        store()
    }

    function playPause() {
        paused = !paused
        store()
    }

    function restart() {
        time = 0
        store()
    }

    function skipNext() {
        if (playingTrack.source === "AUTO") prevTracks.push(playingTrack)
        paused = false;

        if (manualTracks.length != 0) {
            playingTrack = manualTracks.splice(0, 1)[0]
        } else if (nextTracks.length != 0) {
            playingTrack = nextTracks.splice(0, 1)[0]
        } else {
            nextTracks = prevTracks;
            prevTracks = [];
            playingTrack = nextTracks.splice(0, 1)[0]
            paused = ($repeat === "ALL") ? false : true
        }
        reload()
    }

    function skipPrev() {
        if (playingTrack.source === "AUTO") nextTracks.splice(0, 0, playingTrack)
        paused = false;

        if (prevTracks.length != 0) {
            playingTrack = prevTracks.pop()
        } else {
            prevTracks = nextTracks
            nextTracks = [];
            playingTrack = prevTracks.pop()
            paused = ($repeat === "ALL") ? false : true
        }

        reload()
    }

    function handleScrub(e) {
        time = e.detail.time;
    }

    function toggleShuffle() {
        if (ready) {
            if ($shuffle) {
            unshuffleTracks()
            $shuffle = false;
            } else {
                shuffleTracks()
                $shuffle = true
            }
            store()
        }
    }

    function toggleQueueBox() {
        $queueBoxVisible = !$queueBoxVisible;
    }

    function toggleRepeat() {
        if ($repeat === "ALL") {
            $repeat = "ONE"
        } else if ($repeat === "ONE") {
            $repeat = "OFF"
        } else {
            $repeat = "ALL"
        }
    }

</script>

<div class="info">
    <div class="art">
        <img class="art-image" src={cover} alt={title + " art"}>
    </div>
    <div class="text">
        <div class="text-title">
            {title}
        </div>
        <div class="text-artist">
            {artists}
        </div>
    </div>
</div>
<div class="controls">
    <div class="button-section">
        <div class="time">
            {formatTime(time)}
        </div>
        <div class="button-wrapper">
            <button class="btn" on:click={skipPrev} disabled={!ready}>
                <i class="bi bi-skip-start-fill"></i>
            </button>
            <button class="btn main" on:click={playPause} disabled={!ready}>
                {#if paused}
                    <i class="bi bi-play-btn-fill"></i>
                {:else}
                    <i class="bi bi-pause-btn-fill"></i>
                {/if}
            </button>
            <button class="btn" on:click={skipNext} disabled={!ready}>
                <i class="bi bi-skip-end-fill"></i>
            </button>
        </div>
        <div class="time end">
            {formatTime(duration)}
        </div>
        
    </div>
    <div class="scrub-section">
        <ScrubBar bind:currentTime={time} bind:duration={duration} disabled={!ready} on:timechange={handleScrub}/>
    </div>
</div>
<div class="settings" style="--full-light: {$playerColors.fullLight}">
    <button class="btn selected" on:click={toggleQueueBox} class:selected={$queueBoxVisible} disabled={!ready}>
        <div class="btn-icon">
            <i class="bi bi-list-ol"></i>
        </div>
    </button>
    
    <button class="btn selected" on:click={toggleShuffle} class:selected={$shuffle} disabled={!ready}>
        <div class="btn-icon">
            <i class="bi bi-shuffle"></i>
        </div>
    </button>

    <button class="btn selected" on:click={toggleRepeat} class:selected={$repeat !== "OFF"}>
        {#if $repeat === "ONE"}
            <div class="btn-icon">
                <i class="bi bi-repeat-1"></i>
            </div>
        {:else}
            <div class="btn-icon">
                <i class="bi bi-repeat"></i>
            </div>
        {/if}
    </button>

    
</div>


{#key reloader}
    <audio bind:this={player} bind:currentTime={time} bind:duration bind:paused bind:ended />
{/key}


<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: inherit;
        flex: 2;
        .art {
            display: flex;
            height: inherit;
            width: $player-size;
            .art-image {
                border-right-style: solid;
                border-color: $border-color;
                border-width: 1px;
            }
        }
        .text {
            margin-left: calc($player-size / 4);
            margin-right: calc($player-size / 4);
            .text-title {
                font-weight: bold;
            }
            .text-artist {
                opacity: 70%;
                font-size: smaller;
            }
        }
    }
    .controls {
        display: flex;
        flex-direction: column;
        flex: 3;
        .button-section {
            display: flex;
            flex: 7;
            justify-content: center;
            align-items: end;
            padding-bottom: calc($margin-size);
            justify-content: space-between;
            .button-wrapper {
                display: flex;
                justify-content: center;
                .btn {
                    background-color: transparent;
                    border: none;
                    color: $text-color;
                    font-size: $player-btn-size;
                    transition: transform $hover-fade-time ease;
                    i {
                        vertical-align: middle;
                    }
                    &.main {
                        font-size: $player-main-btn-size;
                    }
                    &:hover:enabled {
                        transform: scale(1.1);
                    }
                    &:disabled {
                        opacity: 50%;
                    }
                }
            }
            .time {
                width: calc(3 * $size);
                &.end {
                    text-align: end;
                }
            }
        }
        .scrub-section {
            display: flex;
            align-items: center;
            flex: 3;
            display: flex;
        }
    }
    .settings {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        flex: 2;
        margin-right: calc($player-size / 4);
        .btn {
            margin-left: $margin-size;
            display: flex;
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            color: $text-color;
            background-color: transparent;
            width: $player-settings-btn-size;
            height: $player-settings-btn-size;
            border-width: 1px;
            border-style: solid;
            border-color: transparent;
            border-radius: $margin-size;
            transition: background-color $hover-fade-time ease, opacity $hover-fade-time ease;
            &::before {
                content: "";
                background-color: border;
                height: 0;
                width: 0;
                border-radius: $margin-size;
                transition: height $hover-fade-time ease, width $hover-fade-time ease;
            }
            &:hover:enabled {
                opacity: 100%;
                background-color: $hover-color;
                border-width: 1px;
                border-style: solid;
                border-color: $border-color;
            }
            &.selected:enabled {
                opacity: 100%;
                &::before {
                    content: "";
                    background-color: var(--full-light);
                    margin-top: $margin-size;
                    height: $margin-size;
                    width: $font-size;
                }
                &:hover:enabled {
                    background-color: $hover-color;
                }
            }
            &:disabled {
                opacity: 50%;
            }
        }
    }
    
</style>