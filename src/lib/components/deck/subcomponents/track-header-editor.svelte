<script lang="ts">
    import { goto } from "$app/navigation";

    export let id: string;
    export let title: string;
    export let artists: string;
    export let category: string;
    export let count: number;
	export let duration: number;
    export let cover: string;

</script>
    <form class="track-header form-control">
        <div class="text">
            <label class="text" for="title">title</label>
            <input id="title" type="text" class="text-title" placeholder="title" bind:value={title}>
            <label class="text" for="artist">artists</label>
            <input id="artist" type="text" class="text-artist" placeholder="artists" value={artists}>
            <div>
                <input type="submit" value="Save" class="btn btn-primary">
                <a class="btn btn-secondary" href="./">Cancel</a>
            </div>
        </div>

        <label class="art image" for="art">
            <img src={cover}>
            <div class="overlay">
                replace
            </div>
        </label>
        <input type="file" id="art">
        
        
    </form>  
<div class="separator">
	<div class="number">
		#
	</div>
	<div class="title">
		TITLE
	</div>
</div>
    
<style lang="scss">
    @import '/static/vars.scss';
    @import '/static/form-control.scss';
    @import '/static/buttons.scss';


    .track-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: $track-header-size;
		padding-left: calc($track-item-size + 2 * $margin-size);
		padding-right: $track-item-size;
		.text {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			.text-info {
				margin-top: $margin-size;
				opacity: 70%;
			}
		}
		.art {
			width: calc($track-header-size - 2 * $track-item-size);
			height: calc($track-header-size - 2 * $track-item-size);
			margin-left: $track-item-size;

			.art-image {
				width: inherit;
				height: inherit;
			}
		}
	}
	.separator {
		min-height: calc(1/2 * $track-item-size);
		align-self: center;
		border-bottom: 1px solid $border-color;
		margin-bottom: calc(2 * $margin-size);
		width: calc(100% - 4 * $margin-size);
		display: flex;
		align-items: center;
		.number {
			opacity: 70%;
			width: $track-item-size;
			text-align: center;
		}
		.title {
			opacity: 70%;
		}
	}
</style>

