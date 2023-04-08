<script lang="ts">
    import { playerPalette } from "../../../../../stores/colors";
    import { createEventDispatcher } from "svelte";
    import { formatArtists } from "../../../../../scripts/utils";

    export let track: Track;
    export let id: string;
    export let position: "PREV" | "PLAYING" | "MANUAL" | "NEXT";
    export let showArt = true;

    export let mouseOverRemove = false;

    // <---- EVENT DISPATCHER ---->
    const dispatch = createEventDispatcher();

    let skipHere = () => {
        if (!mouseOverRemove) {
            dispatch('skiphere', {
                id: id
            });
            console.log("CLICKED", id)
        }
    }

    let removeFromQueue = () => {
        if (position === "MANUAL") {
            dispatch('removefromqueue', {
                id: id
            });
            console.log("REMOVED", id)
        }
    }

</script>
<div class="track" on:click={skipHere} class:playing={position === "PLAYING"} style="--full-light: {$playerPalette.bright.light};">
    {#if showArt}
        <div class="art">
            <img class="art-image" src="{track.cover.path}">
        </div>
    {/if}
    <div class="text">
        <div class="text-title">
            {track.title}
        </div>
        <div class="text-artist">
            {formatArtists(track.artists)}
        </div> 
        
    </div>
    {#if position === "MANUAL"}
        <button 
        class="btn" 
        on:mouseenter={() => mouseOverRemove = true}
        on:mouseleave={() => mouseOverRemove = false}
        on:click={removeFromQueue}>
            <i class="bi bi-trash3"></i>
        </button>
    {/if}
</div>

<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .track {
        display: flex;
		flex-grow: 1;
		flex-direction: row;
		align-items: center;
		height: $queue-item-size;
        margin-bottom: $margin-size;
        margin-left: $margin-size;
        margin-right: $margin-size;
		border-radius: $margin-size;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        transition: background-color $hover-fade-time ease-in-out;
        .number {
			display: flex;
			align-items: center;
			height: $queue-item-size;
			width: $queue-item-size - $margin-size;
			.number-text {
				width: inherit;
				text-align: center;
				font-size: larger;
			}
		}
        .text-artist {
            font-size: smaller;
            opacity: 70%;
        }
        .art {
            margin-left: calc(2 * $margin-size);
            margin-right: calc(4 * $margin-size);
            min-height: calc($queue-item-art-size);
            .art-image {
                margin: none;
                height: calc($queue-item-art-size);
                width: calc($queue-item-art-size);
                border-style: solid;
                border-color: $border-color;
                border-width: 1px;
                vertical-align: middle;
            }
        }
        .btn {
            opacity: 0%;
            font-family: inherit;
            float: inline-end;
            margin-left: auto;
            margin-right: $margin-size;
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

            &:hover:enabled {
                opacity: 100%;
                background-color: $hover-color;
                border-width: 1px;
                border-style: solid;
                border-color: $border-color;
            }
            &:disabled {
                opacity: 50%;
            }
        }
        &::before {
            content: "";
            width: 0;
            height: 0;
            background-color: var(--full-light);
            border-radius: $margin-size;
            margin-left: $margin-size;
            transition: width $hover-fade-time ease, height $hover-fade-time ease;
        }
        &:hover {
            background-color: $hover-color;
            border-color: $border-color;
            .btn {
                opacity: 100%;
            }
        }
        &.playing {
            font-weight: bold;
            &:hover {
                background-color: $hover-color;
                border-color: $border-color;
            }
            &::before {
                content: "";
                width: $margin-size;
                height: $queue-item-art-size;
            }
        }
        
    }
</style>