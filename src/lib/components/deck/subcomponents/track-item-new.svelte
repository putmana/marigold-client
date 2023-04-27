<script lang="ts">
    import { deckPalette } from "$lib/stores/colors"; 
    import { createEventDispatcher } from "svelte";
    import { formatArtists } from "$lib/scripts/utils";

    export let track: NewTrack;
    export let position: number;

    let shiftDown = false;
    let files: FileList;


    $: filesArray = (files !== undefined) ? Array.from(files) : []
    $: fileName = (filesArray.length > 0) ? filesArray[0].name : ""
    $: track.path = fileName
    
    $: console.log(files)

    const dispatch = createEventDispatcher();
    
    function handleChange() {
        dispatch('change', {
            track: track
        })
    }
    

</script>


<div class="track" style="--hover-light: {$deckPalette.bright.light}; --hover-dark: {$deckPalette.bright.dark}">
    <div class="number">
        <span class="number-text">
            <i class="bi bi-grip-horizontal"></i>
        </span>
    </div>
    <form class="form-control">
        <div class="text-input">
            <label class="text" for="{track.temp_id}-track-title">title</label>
            <input id="{track.temp_id}-track-title" type="text" class="text-title" bind:value={track.title}>
        </div>
        <div class="text-input">
            <label class="text" for="{track.temp_id}-track-artist">artist</label>
            <input id="{track.temp_id}-track-artists" type="text" class="text-artist" bind:value={track.artists}>
        </div>
        <div class="file-input">
            <label class="text">audio file</label>
            <div class="file-name">
                <label class="btn btn-primary" for="{track.temp_id}-track-file">Select File</label>
                <input id="{track.temp_id}-track-file" type="file" bind:files>
                <span>{fileName}</span>
            </div>
        </div>
    </form>
</div>

<style lang="scss">
    @import '/static/vars.scss';
    @import '/static/form-control.scss';
    @import '/static/buttons.scss';

    .track {
        display: flex;
		flex-direction: row;
        min-height: calc($track-item-size + $margin-size * 4);
		align-items: center;
        border: 1px solid transparent;
		border-radius: $margin-size;
        margin-left: calc(2 * $margin-size);
        margin-right: calc(2 * $margin-size);
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
        form {
            display: flex;
            flex-direction: row;
        }
        .text-input {
            display: flex;
            flex-direction: column;
            margin-right: calc(2 * $margin-size);
            justify-content: center;
            
        }
        .file-input {
            display: flex;
            flex-direction: column;
            margin-right: calc(2 * $margin-size);
            justify-content: center;
        }
        .file-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            span {
                opacity: 70%;
                margin-left: $margin-size;
                font-size: smaller;
            }
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