<script lang="ts">
    import { deckPalette } from "../../../../../stores/colors";
    import { createEventDispatcher } from "svelte";
    import { formatArtists } from "../../../../../scripts/utils";

    export let track: Track;
    export let position: number;
    export let showArt = true;

    let shiftDown = false;

    const dispatch = createEventDispatcher();
    
    function handleKeyDown(e) {
        if (e.key === "Shift") {
            shiftDown = true;
        }
    }

    function handleKeyUp(e) {
        if (e.key === "Shift") {
            shiftDown = false;
        }
    }

    function handleClick(e) {
        if (shiftDown) {
            queueThisTrack()
        } else {
            queueThisList()
        }
    }

    let queueThisList = () => {
        dispatch('queuethislist')
    }

    let queueThisTrack = () => {
        dispatch('queuethistrack')
    }

</script>
<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<div class="track" on:click={handleClick} style="--hover-light: {$deckPalette.bright.light}; --hover-dark: {$deckPalette.bright.dark}">
    <div class="number">
        <span class="number-text">
            {position}
        </span>
    </div>
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

		flex-direction: row;
        min-height: calc($track-item-size + $margin-size * 4);
		align-items: center;
        border: 1px solid transparent;
		border-radius: $margin-size;
        margin-left: $margin-size;
        margin-right: $margin-size;
        transition: background-color $hover-fade-time ease;
        .number {
			display: flex;
			align-items: center;
			height: $track-item-size;
			width: $track-item-size;
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
            margin-right: calc(4 * $margin-size);
            min-height: calc($track-item-art-size);
            .art-image {
                margin: none;
                height: calc($track-item-art-size);
                width: calc($track-item-art-size);
                border-style: solid;
                border-color: $border-color;
                border-width: 1px;
                vertical-align: middle;
            }
        }
        &:hover {
            background-color: $hover-color;
            border-color: $border-color;
        }
    }
</style>