<script lang="ts">
    import { crossfade, fade, fly, scale } from "svelte/transition";
    import { playerColors } from "../../../../../stores/colors";
    import QueueItem from "./queue-item.svelte";
    import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
    import { queueBoxVisible, tracksPlayed, tracksQueued, tracksManual, tracksAll, currentTrack, repeat, queueStage } from "../../../../../stores/player";
    import { getQueueTrackPosition, reorderQueue } from "../../../../../scripts/queue";

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
    function skipToTrack(e) {
        let id = e.detail.id
        $queueStage = reorderQueue($tracksAll, getQueueTrackPosition($tracksAll, id))
        console.log("SKIP TO TRACK", e)
    }

    // <---- BINDS ---->
    $: manual = [...$tracksManual]
    $: next = ($repeat === "ALL") ? [...$tracksQueued, ...$tracksPlayed] : [...$tracksQueued]
    $: hasManual = (manual.length > 0)
    $: hasNext = (next.length > 0)


</script>

{#if $queueBoxVisible}
    <div transition:fly="{{x: 200, duration: 200}}" class="queue-box" style="--main-light: {$playerColors.mainLight}; --main-dark: {$playerColors.mainDark}">
        <div class="body">
                <div class="list">
                    <div class="label">
                        NOW PLAYING
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
                            MANUALLY QUEUED
                        </div>
                        {#each manual as track (track.id)}
                            <div in:receive="{{key: track.id}}" out:send="{{key: track.id}}" animate:flip="{{duration: 200}}">
                                <QueueItem track={track.track} id={track.id} position="MANUAL" on:skiphere={skipToTrack}/>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if hasNext}
                    <div transition:fade="{{duration: 200}}" class="list">
                        <div class="label">
                            UP NEXT
                        </div>
                        {#each next as track (track.id)}
                            <div in:receive="{{key: track.id}}" out:send="{{key: track.id}}" animate:flip="{{duration: 200}}">
                                <QueueItem track={track.track} id={track.id} position="NEXT" on:skiphere={skipToTrack}/>
                            </div>
                        {/each}
                    </div>
                {/if}
        </div>
    </div>
{/if}

<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .queue-box {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: $queue-box-size;
        width: $queue-box-size;
        bottom: calc($player-size + 3 * $margin-size);
        right: calc(3 * $margin-size);
        background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
        background-size: 100vw;
        background-position: right;
        border-radius: $margin-size;
        border-style: solid;
        border-color: $border-color;
        border-width: 1px;
        padding: $margin-size;
        .header {
            display: flex;
            height: $queue-item-size;
            align-items: center;
            .text {
                font-weight: bold;
                margin-left: $queue-item-size;
            }
        }
        .body {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            height: $queue-item-size;
            width: inherit;
            overflow-y: scroll;
            
            .list {
                display: block;

            }
            .label {
                background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
                background-size: 100vw;
                background-position: right;
                z-index: 1;
                position: sticky;
                top: 0;
                display: flex;
                padding-left: calc(4 * $margin-size);
                height: $queue-item-size;
                align-items: center;
                font-weight: bold;
            }
        }
    }
</style>