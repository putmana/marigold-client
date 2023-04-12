<script lang="ts">
    import { crossfade, fade, fly, scale } from "svelte/transition";
    import { playerPalette } from "$lib/stores/colors";
    import QueueItem from "./subcomponents/queue-item.svelte";
    import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
    import { queueBoxVisible, tracksPlayed, tracksQueued, tracksManual, tracksAll, currentTrack, repeat, queueStage, queueReady } from "$lib/stores/player";
    import { clearManualQueue, getQueueTrackPosition, reorderManualQueue, reorderQueue } from "$lib/scripts/queue";

    // <---- ANIMATION ---->
    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 200,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
        }
    })

    // <---- EVENT HANDLERS ---->
    function skipToTrack(e: CustomEvent) {
        let id = e.detail.id
        $queueStage = reorderQueue($tracksAll, getQueueTrackPosition($tracksAll, id))
        console.log("SKIP TO TRACK", e)
    }

    function removeFromQueue(e: CustomEvent) {
        let id = e.detail.id
        let newQueue = $tracksManual.filter((track: QueueTrack) => track.id != id)
        $queueStage = reorderManualQueue(newQueue)
        console.log("REMOVE TRACK", e)
    }

    // <---- BINDS ---->
    $: manual = [...$tracksManual]
    $: next = ($repeat === "ALL") ? [...$tracksQueued, ...$tracksPlayed] : [...$tracksQueued]
    $: hasManual = (manual.length > 0)
    $: hasNext = (next.length > 0)


</script>
    {#if $queueReady}
        <div class="queue-box" style="--main-light: {$playerPalette.main.light}; --main-dark: {$playerPalette.main.dark};" class:expanded={$queueBoxVisible}>
            <div class="body">
                <div class="list">
                    <div class="label">
                        <span class="text">
                            NOW PLAYING
                        </span>
                        
                    </div>
                    {#each [$currentTrack] as track (track.id)}
                        <div in:receive="{{key: track.id}}" out:send="{{key: track.id}}" animate:flip="{{duration: 200}}">
                            <QueueItem track={track.track} id={track.id} position="PLAYING"/> 
                        </div>
                    {/each}
                    
                </div>

                {#if hasManual}
                    <div transition:fade="{{duration: 200}}" class="list">
                        <div class="label">
                            <span class="text">
                                MANUALLY QUEUED
                            </span>
                            <button class="btn" on:click={() => $queueStage = clearManualQueue()}>
                                <span class="tip">
                                    CLEAR QUEUE
                                </span>
                                <i class="bi bi-trash3"></i>
                               
                            </button>
                        </div>
                        {#each manual as track (track.id)}
                            <div in:receive="{{key: track.id}}" out:send="{{key: track.id}}" animate:flip="{{duration: 200}}">
                                <QueueItem track={track.track} id={track.id} position="MANUAL" on:skiphere={skipToTrack} on:removefromqueue={removeFromQueue}/>
                            </div>
                        {/each}
                        
                    </div>
                {/if}

                {#if hasNext}
                    <div transition:fade="{{duration: 200}}" class="list">
                        <div class="label">
                            <span class="text">
                                UP NEXT
                            </span>
                        </div>
                        {#each next as track (track.id)}
                            <div in:receive="{{key: track.id}}" out:send="{{key: track.id}}" animate:flip="{{duration: 200}}">
                                <QueueItem track={track.track} id={track.id} position="NEXT" on:skiphere={skipToTrack} on:removefromqueue={removeFromQueue}/>
                            </div>
                        {/each}
                        
                    </div>
                {/if}
            </div>
        </div>
    {/if}

<style lang="scss">
    @import '/static/vars.scss';
    .queue-box {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        width: 0;
        background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
        background-size: 100vw;
        background-position: right;
        border-left: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        overflow-x: hidden;
        overflow-y: hidden;
        transition: width $hover-fade-time ease, min-width $hover-fade-time ease;
        
        .body {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            width: calc($queue-box-size - $margin-size);
            margin-top: $margin-size;
            margin-bottom: $margin-size;
            overflow-y: auto;
            
            .list {
                display: flex;
                flex-direction: column;

            }
            .label {
                background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
                background-size: 100vw;
                background-position: right;
                z-index: 1;
                position: sticky;
                top: 0;
                display: flex;
                height: $queue-item-size;
                align-items: center;
                font-weight: bold;
                .text {
                    flex-grow: 1;
                    margin-left: calc(4 * $margin-size);
                }
                .btn {
                    font-family: inherit;
                    float: inline-end;
                    margin-right: calc(2 * $margin-size + 2px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: $text-color;
                    background-color: transparent;
                    min-width: calc($size);
                    min-height: calc($size);
                    border-width: 1px;
                    border-style: solid;
                    border-color: transparent;
                    border-radius: $margin-size;
                    transition: background-color $hover-fade-time ease, opacity $hover-fade-time ease;
                    .tip {
                        font-weight: bold;
                        font-size: smaller;
                        margin-right: $margin-size;
                        opacity: 0;
                        transition: opacity $hover-fade-time ease;
                    }

                    &:hover:enabled {
                        opacity: 100%;
                        background-color: $hover-color;
                        border-width: 1px;
                        border-style: solid;
                        border-color: $border-color;
                        .tip {
                            opacity: 100%;
                        }
                    }

                    &:disabled {
                        opacity: 50%;
                    }
                }

            }
        }
        &.expanded {
            min-width: $queue-box-size;
        }

    }
</style>