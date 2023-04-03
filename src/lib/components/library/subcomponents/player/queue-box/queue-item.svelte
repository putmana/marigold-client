<script lang="ts">
    import { playerColors } from "../../../../../stores/colors";
    import { createEventDispatcher } from "svelte";
    import { formatArtists } from "../../../../../scripts/utils";

    export let track: Track;
    export let id: string;
    export let position: "PREV" | "PLAYING" | "MANUAL" | "NEXT";
    export let showArt = true;

    // <---- EVENT DISPATCHER ---->
    const dispatch = createEventDispatcher();

    let skipHere = () => {
        dispatch('skiphere', {
            id: id
        });
        console.log("CLICKED", id)
    }

</script>
<div class="track" on:click={skipHere} class:playing={position === "PLAYING"} style="--full-light: {$playerColors.fullLight};">
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