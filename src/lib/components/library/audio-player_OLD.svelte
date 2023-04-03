<script lang="ts">
    import { onMount } from "svelte";
    import ColorEngine from "../../scripts/color_engine";
    import { shuffleTracks } from "../../scripts/shuffle";
    import { formatArtists, formatTime } from "../../scripts/utils";
    import { playerColors } from "../../stores/colors";

    export let queue: Queue;
    export let repeat: string;
    export let shuffle: boolean;
    export let unique: Symbol;
    export let shuffleMap: Map<number, number>;
    
    // <---- BIND VALUES ---->
    let player: HTMLAudioElement;
    let time = 0;
    let duration: number;
    let ended: boolean;
    let paused = false;
    let debug = false;
    let queueVisible = false;

    // <---- SRC VALUES ---->
    $: src = queue.tracks[queue.position].path;
    $: cover = queue.tracks[queue.position].cover.path;
    $: playPauseBtn = (paused) ? "PLAY" : "PAUSE"
    $: $playerColors = new ColorEngine(queue.tracks[queue.position].cover.color)
    $: if (ended) { (repeat === "ONE") ? reload() : skipNext() }
    $: console.log(repeat);
    
    // <---- UTILITY FUNCTIONS ---->
    let modBack = (num: number, mod: number) => {
        if (mod <= 0) { throw new Error("mod must be greater than or equal to zero!")}
        console.log(num, mod)
        return (num >= 0) ? num : (modBack(num + mod, mod))
    }

    // <---- CYCLE FUNCTIONS ---->
    let offsetPosition = (offset: number) => {
        let newPosition: number;

        if (offset < 0) {
            newPosition = modBack(queue.position + offset, queue.tracks.length)
        } else {
            newPosition = (queue.position + offset) % queue.tracks.length
        }
        return newPosition
    }

    // <---- CONTROL FUNCTIONS ---->
    function play() {
        paused = false;
    }
    
    function pause() {
        paused = true;
    }  

    function playPause() {
        paused = !paused
    }

    function restart() {
        time = 0;
    }

    function skipNext() {
        let end = (offsetPosition(1) == 0 && repeat === "NONE");
        queue.position = offsetPosition(1);
        reload(end)
    }

    function skipPrev() {
        queue.position = offsetPosition(-1);
        reload()
    }

    function skipToTrack(index: number) {
        queue.position = index;
        reload()
    }
    
    async function reload(end: boolean = false) {
        restart()
        player.load()
        if (end) {
            pause()
        } else {
            if (!paused) player.play()
        }   
    }

    // <---- SHUFFLE FUNCTIONS ---->
    function enableShuffle() {
        shuffle = true;
        const shuffled = shuffleTracks(queue.tracks, queue.position)
        queue.tracks = shuffled.list
        queue.position = 0
        shuffleMap = shuffled.shuffleMap
        console.log(shuffleMap)
    }

    function disableShuffle() {
        queue.tracks = queue.source
        queue.position = 
        shuffle = false;
    }

    // <---- BUTTON FUNCTIONS ---->
    function scrubToTime(e) {
        console.log("SCRUBBED TO "+e.detail.time)
        time = e.detail.time;
    }

    function handleSkipPrev() {
        if (time < 1) {
            skipPrev()
        } else {
            restart()
        }
    }

    function handleSkipToTrack(e) {
        skipToTrack(e.detail.index)
        console.log("TEST")
    }

    // <---- SETTINGS BUTTONS FUNCTIONS ---->
    function toggleQueueBox() {
        queueVisible = !queueVisible;
    }

    function toggleRepeat() {
        if (repeat === "ALL") {
            repeat = "ONE"
        } else if (repeat === "ONE") {
            repeat = "NONE"
        } else {
            repeat = "ALL"
        }
    }

    function toggleShuffle() {
        (shuffle) ? disableShuffle() : enableShuffle();
    }

    // <---- LIFECYCLE FUNCTIONS ---->
    onMount(() => {
        console.log("MOUNTED")
        reload()
        console.log("RELOADED")
        pause()
        console.log("PAUSED")
    })

</script>

{#if debug}
    <div class="debug">
        <div class="debug-info">
            <div>PAUSED: {paused}</div>
            <div>CURRENTLY PLAYING SRC: {src}</div>
            <div>CURRENT TIME: {time}</div>
            <span>
                <button on:click={skipPrev}>PREV</button><button on:click={playPause}>{playPauseBtn}</button><button on:click={skipNext}>NEXT</button>
            </span>
            {#each queue.tracks as track, i}
                <div>
                    {track.title} -- {track.path}
                    {#if i == queue.position}
                        <span class="green"><b>&lt- playing</b></span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{/if}
<audio bind:this={player} bind:currentTime={time} bind:duration bind:paused bind:ended>
    <source src={src}>
</audio>


<div class="info">
    <div class="art">
        <img class="art-image" src={cover}>
    </div>
    <div class="text">
        <div class="text-title">
            {queue.tracks[queue.position].title}
        </div>
        <div class="text-artist">
            {formatArtists(queue.tracks[queue.position].artists)}
        </div>
    </div>
</div>
<div class="controls">
    <div class="button-section">
        <div class="time">
            {formatTime(time)}
        </div>
        <div class="button-wrapper">
            <button class="btn" on:click={handleSkipPrev}>
                <i class="bi bi-skip-start-fill"></i>
            </button>
            <button class="btn main" on:click={playPause}>
                {#if paused}
                    <i class="bi bi-play-btn-fill"></i>
                {:else}
                    <i class="bi bi-pause-btn-fill"></i>
                {/if}
            </button>
            <button class="btn" on:click={skipNext}>
                <i class="bi bi-skip-end-fill"></i>
            </button>
        </div>
        <div class="time end">
            {formatTime(duration)}
        </div>
        
    </div>
    <div class="scrub-section">
        <ScrubBar bind:currentTime={time} bind:duration={duration} on:timechange={scrubToTime}/>
    </div>
</div>
<div class="settings" style="--full-light: {$playerColors.fullLight}">
    <button class="btn selected" on:click={toggleQueueBox} class:selected={queueVisible}>
        <div class="btn-icon">
            <i class="bi bi-list-ol"></i>
        </div>
    </button>
    <button class="btn selected" on:click={toggleRepeat} class:selected={repeat !== "NONE"}>
        {#if repeat === "ONE"}
            <div class="btn-icon">
                <i class="bi bi-repeat-1"></i>
            </div>
        {:else}
            <div class="btn-icon">
                <i class="bi bi-repeat"></i>
            </div>
        {/if}

    </button>
    <button class="btn selected" on:click={toggleShuffle} class:selected={shuffle}>
        <div class="btn-icon">
            <i class="bi bi-shuffle"></i>
        </div>
    </button>
</div>
<QueueBox bind:visible={queueVisible} bind:queue bind:unique on:skiptotrack={handleSkipToTrack}/>

<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .debug {
        width: 100%;
        height: 100%;

        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        
        z-index: 99999;
        display: flex;
        flex-direction: column;
        padding-top: calc(4 * $size);
        align-items: center;
        position: absolute;
        background-color: $shadow-color;
        
        .debug-info {
            max-height: 40%;
            overflow-y: scroll;
            background-color: $gray-b;
            padding: calc(3 * $size);
            border-style: solid;
            border-width: 1px;
            border-color: $border-color;
            border-radius: $margin-size;
        }
        .green {
            color: lightgreen;
        }
    }
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
                    &:hover {
                        transform: scale(1.1);
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
            opacity: 50%;
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
            &:hover {
                opacity: 100%;
                background-color: $hover-color;
                border-width: 1px;
                border-style: solid;
                border-color: $border-color;
            }
            &.selected {
                opacity: 100%;
                background-color: $selected-color;
                border-width: 1px;
                border-style: solid;
                border-color: $border-color;
                border-radius: $margin-size;
                &::before {
                    content: "";
                    background-color: var(--full-light);
                    margin-top: $margin-size;
                    height: $margin-size;
                    width: $font-size;
                }
                &:hover {
                    background-color: $hover-color;
                }
            }
        }
    }
    
</style>

