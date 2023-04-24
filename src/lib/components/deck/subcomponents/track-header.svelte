<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatTime, pluralize } from "$lib/scripts/utils";
    import { createEventDispatcher } from "svelte";
	
	export let id: string;
    export let title: string;
    export let artists: string;
    export let category: string;
    export let count: number;
	export let duration: number;
    export let cover: string;

	const dispatch = createEventDispatcher();

	function queueThisList() {
		dispatch("queuethislist");
	}

</script>
<div class="track-header">
    <div class="text">
        <div class="text-title">
            {title}
        </div>
        
        <div class="text-info">
			<span class="text-artist">
				{artists}
			</span>
			<b>&#x2022</b>
            <span class="text-subcategory">
                {category}
            </span>
            <b>&#x2022</b>
            <span class="text-count">
                {count} {pluralize("track", count)}
            </span>
            <b>&#x2022</b>
            <span class="text-duration">
                {formatTime(duration, true, false)}
            </span>
        </div>
		<div class="buttons">
			<button class="btn btn-primary" on:click={queueThisList}><i class="bi bi-play-fill"></i> PLAY</button>
			<a class="btn btn-primary" href="./{id}/edit"><i class="bi bi-pencil-fill"></i></a>
		</div>
    </div>
    <div class="art">
        <img class="art-image" src={cover}>
    </div>
</div>
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
			.text-title {
				font-size: calc(2 * $size);
				font-weight: bold;
			}
			.text-artist {
				font-size: 12pt;
				font-size: bold;
			}
			.text-info {
				margin-top: $margin-size;
				opacity: 70%;
			}
			.buttons {
				margin-top: calc(4 * $margin-size);
			}
		}
		.art {
			width: calc($track-header-size - 2 * $track-item-size);
			height: calc($track-header-size - 2 * $track-item-size);
			margin-left: $track-item-size;

			.art-image {
				width: inherit;
				height: inherit;
				border-style: solid;
				border-color: $border-color;
				border-width: 1px;
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

