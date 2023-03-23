<script lang="ts">
    import { fly } from "svelte/transition";
    import { playerColors } from "../../../stores/colors";
    import QueueBoxItem from "./queue-box-item.svelte";
    
    export let visible = false;
    export let queue: Queue;
    export let unique: Symbol;

   
</script>

{#if visible}
    <div transition:fly="{{x: 200, duration: 200}}" class="queue-box" style="--main-light: {$playerColors.mainLight}; --main-dark: {$playerColors.mainDark}">
        <div class="header">
            <span class="text">
                QUEUE
            </span>
        </div>
        <div class="body">
            {#each queue.tracks as track, i}
                <QueueBoxItem track={track} position={i} showArt={true} current={queue.position} on:skiptotrack />
            {/each}
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
        }
    }
</style>