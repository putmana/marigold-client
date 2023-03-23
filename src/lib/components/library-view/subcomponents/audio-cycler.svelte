<script lang="ts">
    import { onMount } from "svelte";
    import ColorEngine from "../../../scripts/color_engine";
    import { clamp } from "../../../scripts/utils";
    import { playerColors } from "../../../stores/colors";

    export let queue: Track[] = [];
    export let queuePosition = 0;

    let loaded = false;

    // <---- INTERFACE ---->
    // An instance of this interface will be created for each HTML audio element
    // and appended to array "player"
    interface PlayerBind {
        paused: boolean;
        src: string;
        element: HTMLAudioElement;
        end: boolean;
    }

    let player: PlayerBind[] = []; // The array containing the PlayerBind instances
    let playerPosition: number = 0; // The index of the PlayerBind instance bound to the currently playing audio element.
    let preload: number = 0 // The number of audio elements going in each direction. Calculated on mount.
    let loop: boolean = true;

    // <---- OPTIONS ---->
    const minPreload = 1; // The minimum number of audio elements going in each direction.
    const maxPreload = 4; // The maximum number of audio elements going in each direction.
    const debug = true; // The debug screen will be displayed if true

    // <---- BIND VALUES ---->
    // Returns the current time of currently playing audio element (READ ONLY!)
    $: currentTime = (loaded) ? player[playerPosition].element.currentTime : 0
    // Updates the player's colors to match the currently playing track's album art
    $: $playerColors = new ColorEngine(queue[queuePosition].cover.color)

    // <---- UTILITY FUNCTIONS ---->
    // Recursive function that takes a negative number {num}, adds
    // a positive number {mod} to it until {num} is positive, then returns {num}
    let moveBack = (num: number, mod: number) => {
        if (mod <= 0) { throw new Error("mod must be greater than or equal to zero!")}
        console.log(num, mod)
        return (num >= 0) ? num : (moveBack(num + mod, mod))
    }

    // <---- CYCLE FUNCTIONS ---->
    // Given the current position in the list and an offset, calculate the index
    // of that offset when wrapping at the boundary of the list
    // I.e., If I am at position 3 in a list with 4 items (last index = 3), moving
    // forward by an offset of 1 will put me at position 0.
    $: nextPlayerPosition = (offset: number = 1) => {
        if (offset < 0) {
            return moveBack(playerPosition + offset, preload)
        }
        return (playerPosition + offset) % preload
    }
    $: nextQueuePosition = (offset: number = 1) => {
        if (offset < 0) {
            return moveBack(queuePosition + offset, queue.length)
        }
        return (queuePosition + offset) % queue.length
    }
    // <---- LOAD FUNCTIONS ---->
    // Load the position at the loading boundary (overwrite the src for the player at position + index with the correct source)
    function loadBoundary(forwards: boolean = true) {
        if (forwards) {
            player[nextPlayerPosition(preload)].src = queue[nextQueuePosition(preload)].path
            player[nextPlayerPosition(preload)].end = (nextQueuePosition(preload) == 0) ? true : false
        }
        player[nextPlayerPosition(-1 * preload)].src = queue[nextQueuePosition(-1 * preload)].path // update the next player at the load boundry;
        player[nextPlayerPosition(-1 * preload)].end = (nextQueuePosition(-1 * preload) == 0) // check if the loaded 
    }

    function loadAll() {
        for (let i = (-1 * preload); i <= preload; i++) {
            player[nextPlayerPosition(i)].src = queue[nextQueuePosition(i)].path
            player[nextPlayerPosition(i)].end = (nextQueuePosition(i) == 0)
        }
    }

    // <---- CONTROL FUNCTIONS ---->
    // Sets the position to the player position given an offset
    function cycle(offset: number = 1) {
        pause()
        restart()
        playerPosition = nextPlayerPosition(offset)
        queuePosition = nextQueuePosition(offset)
        if (Math.abs(offset) == 1) {
            loadBoundary((offset >= 0))
        } else {
            loadAll()
        }
        if (loop || !player[playerPosition].end) { play() }
    }

    // Play the audio track bound to the PlayerBind instance at the current position
    function play() {
        player[playerPosition].paused = false;
    }

    // Pause the audio track
    function pause() {
        player[playerPosition].paused = true;
    }

    // Restart the audio track
    function restart() {
        jump(0)
    }

    // Jump to a given time (in seconds) in the audio track
    function jump(time: number) {
        time = clamp(time, 0, player[playerPosition].element.duration)
        player[playerPosition].element.currentTime = time;
    }

    // Skip to the next track in the queue
    function skipNext() {
        cycle(1)
    }

    // Skip to the previous track in the queue
    function skipPrev() {
        cycle(-1)
    }

    // Skip to the track in the queue at index
    function skipTo(index: number) {
        cycle(index - queuePosition)
    }

    // Initialize the player and bind all PlayerBinds to their respective audio elements
    onMount(() => {
        loop = true;
        preload = clamp(Math.floor(queue.length / 2), minPreload, maxPreload)
        playerPosition = preload;
        for (let i = (-1 * preload); i <= preload; i++) {
            let pb: PlayerBind = {
                paused: true,
                src: queue[nextQueuePosition(i)].path,
                element: new Audio(),
                end: (nextQueuePosition(i) == 0) ? true : false
            }
            player.push(pb)
        }
        console.log("PLAYERS LOADED");

        loaded = true;
    })

</script>
{#if loaded}
    {#if debug}
        <div class="debug">
            <h1>MUSIC DEBUG</h1>
            <div class="debug-info">
                
                <p>CURRENT PLAYER INDEX: {playerPosition}</p>
                <p>NEXT PLAYER INDEX: {nextPlayerPosition()}</p>
                <p>CURRENT QUEUE INDEX: {queuePosition}</p>
                <p>NEXT QUEUE INDEX: {nextQueuePosition()}</p>
                <p>CURRENT QUEUE PATH: {queue[queuePosition].path}</p>
                <p>NEXT QUEUE PATH: {queue[nextQueuePosition()].path}</p>
                <p>CURRENT TIME: {currentTime}</p>
                
                <button on:click={skipPrev}>
                    &lt PREV
                </button>
                <button on:click={play}>
                    PLAY
                </button>
                <button on:click={skipNext}>
                    NEXT &gt
                </button>
                <div class="row">
                    <div class="col">
                        {#each queue as source}
                            <p>SRC: {source}</p>
                        {:else}
                            <p>No queue loaded</p>
                        {/each}
                    </div>
                    <div class="col">
                        {#each player as playerBind, i}
                            <p>PLAYER {i}</p>
                            <span>SRC: {playerBind.src}, PAUSED {playerBind.paused}</span>
                            {#if playerBind.end}
                                <span>END</span>
                            {/if}
                            {#if i == playerPosition}
                                <span><b> &lt- playing </b></span>
                            {/if}
                            {#if i == nextPlayerPosition()}
                                <span class="green"> &lt- next</span>
                            {/if}
                            {#if i == nextPlayerPosition(-1)}
                                <span class="red"> &lt- prev</span>
                            {/if}
                        {:else}
                            <p>Something is wrong with the players</p>
                        {/each}
                    </div>
                    
                </div>
                
            </div>
        </div>
    {/if}
    {#each player as playerBind}
        <audio 
            bind:this={playerBind.element} 
            on:ended={skipNext}
            bind:paused={playerBind.paused} 
            src={playerBind.src}>
        </audio>
    {/each}
    <div class="info">
        <div class="art">
            <img class="art-image" src={queue[queuePosition].cover.path}>
        </div>
        <div class="text">
            <div class="text-title">
                {queue[queuePosition].title}
            </div>
            <div class="text-artist">

            </div>
        </div>
    </div>
{/if}


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
        padding-top: (4 * $size);
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
        .row {
            display: flex;
            flex-direction: row;
            .col {
                margin-left: $size;
                margin-right: $size;
            }
        }
        .red {
            color: lightcoral;
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
            width: $player-info-size;
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
                .text-title {
                    font-weight: bold;
                }
                .text-artist {
                    opacity: 70%;
                    font-size: smaller;
                }
		    }
        }
</style>