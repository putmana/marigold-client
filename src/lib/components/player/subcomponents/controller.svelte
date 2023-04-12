<script lang="ts">
    import { buildPalette } from "$lib/scripts/palette";
    import { getQueueTrackPosition } from "$lib/scripts/queue";
    import { formatArtists, formatTime } from "$lib/scripts/utils";
    import { playerPalette } from "$lib/stores/colors";
    import { currentTrack, tracksQueued, tracksPlayed, queueStage, position, repeat, shuffle, tracksManual, queueBoxVisible, queueReady, defaultQueueTrack } from "$lib/stores/player";
    import ScrubBar from "./scrub-bar.svelte";

    let ready = false;

    // <---- AUDIO PLAYER BINDS ---->
    let player: HTMLAudioElement;
    let time = 0;
    let duration = 0;
    let paused = true;
    let ended = false;
    let reloader: Symbol = Symbol();

    let title: string = "";
    let artists: string = "";
    let src: string = "";
    let cover: string = "./img/mg/covers/default.png";
    
    // <---- INTERNAL VALUES ---->
    let sourceTracks: QueueTrack[] = []; 
    // The original sorted list of tracks from the selected album or playlist
    let prevTracks: QueueTrack[] = []; 
    // Previously played tracks in the current session
    let playingTrack: QueueTrack = defaultQueueTrack; 
    // The currently playing track
    let nextTracks: QueueTrack[] = []; 
    // The tracks that are up next in the queue
    let manualTracks: QueueTrack[] = []; 
    // Tracks manually added to the queue by the user

    // <---- DISPLAY VALUES ---->

    $: if (ready) {
        title = playingTrack.track.title;
        artists = formatArtists(playingTrack.track.artists)
        player.src = playingTrack.track.path;
        cover = playingTrack.track.cover.path;
    }
    
    // <---- BIND UPDATES ---->
    $: (paused) ? player?.pause() : player.play();
    $: if (ended) ($repeat === "ONE") ? restart() : skipNext();

    // <---- SHUFFLE FUNCTIONS ---->
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

    // <---- QUEUE UPDATE LISTENER ---->
    $: if (!$queueStage.seen) {
        processStage()
        store()
    }

    // <---- QUEUE UPDATE HANDLER ---->
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

        } else if ($queueStage.flag === "REORDER_MANUAL") {
            manualTracks = $queueStage.tracks;
            
        } else if ($queueStage.flag === "DIE") {
            prevTracks = []
            nextTracks = []
            playingTrack = defaultQueueTrack
            ready = false;
        }

        $queueStage.seen = true;
        store()
    }


    
    // <---- UPDATE FUNCTIONS ---->
    function store() {
        $tracksQueued = nextTracks;
        $tracksPlayed = prevTracks;
        $currentTrack = playingTrack;
        $tracksManual = manualTracks;
        $queueReady = ready;
    }
    function reload() {
        reloader = Symbol()
        player.load()
        $playerPalette = buildPalette(playingTrack.track.cover.color);
        store()
    }

    // <---- CONTROL FUNCTIONS ---->
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
        reload()
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
            playingTrack = prevTracks.pop() ?? playingTrack
        } else {
            prevTracks = nextTracks
            nextTracks = [];
            playingTrack = prevTracks.pop() ?? playingTrack
            paused = ($repeat === "ALL") ? false : true
        }

        reload()
    }

    // <---- EVENT HANDLER ---->
    function handleScrub(e: CustomEvent) {
        time = e.detail.time;
    }

    // <---- TOGGLE FUNCTIONS ---->
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
<div class="scrub">
    <ScrubBar bind:currentTime={time} bind:duration={duration} disabled={!ready} on:timechange={handleScrub}/>
</div>
<div class="main">
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
    <div class="controls" style="--full-light: {$playerPalette.bright.light}">
        <div class="button-wrapper">
            <button class="btn selected" on:click={toggleShuffle} class:selected={$shuffle} disabled={!ready}>
                <div class="btn-icon">
                    <i class="bi bi-shuffle"></i>
                </div>
            </button>            
            <button class="btn skip" on:click={skipPrev} disabled={!ready}>
                <i class="bi bi-skip-start-fill"></i>
            </button>
            <button class="btn playpause" on:click={playPause} disabled={!ready}>
                {#if paused}
                <i class="bi bi-play-fill"></i>
                {:else}
                <i class="bi bi-pause-fill"></i>
                {/if}
            </button>
            <button class="btn skip" on:click={skipNext} disabled={!ready}>
                <i class="bi bi-skip-end-fill"></i>
            </button>
            <button class="btn selected" on:click={toggleRepeat} class:selected={$repeat !== "OFF"} disabled={!ready}>
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
    </div>
    <div class="settings" style="--full-light: {$playerPalette.bright.light}">
        
        <button class="btn selected" on:click={toggleQueueBox} class:selected={$queueBoxVisible} disabled={!ready}>
            <div class="btn-icon">
                <i class="bi bi-list-ol"></i>
            </div>
        </button>
        <div class="time">
            <span>
                {formatTime(time)}
            </span>
            /
            <span>
                {formatTime(duration)}
            </span>
        </div>
    </div>
</div>
    
    
{#key reloader}
    <audio bind:this={player} bind:currentTime={time} bind:duration bind:paused bind:ended />
{/key}


<style lang="scss">
    @import '/static/vars.scss';
    .main {
        border-top: 1px solid $border-color;
        display: flex;
        height: $player-size;
        .info {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex: 2;
            .art {
                display: flex;
                height: $player-size;
                width: $player-size;
                .art-image {
                    border-right: 1px solid $border-color;
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
            justify-content: center;
            align-items: center;
            flex: 3;
            .button-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
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
                    &.skip {
                        font-size: $player-skip-btn-size;
                    }
                    &.playpause {
                        font-size: $player-playpause-btn-size;
                    }
                }
            }
        }
        .settings {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            flex: 2;
            margin-right: calc($player-size / 4);
            .time {
                font-size: smaller;
                margin-bottom: 1px;
                margin-right: $margin-size;
                span {
                    margin-left: $margin-size;
                    margin-right: $margin-size;
                }
            }
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
    }
        
    </style>