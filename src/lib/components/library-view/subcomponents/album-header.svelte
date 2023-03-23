<script lang="ts">
    import { formatArtists, formatTime } from "../../../scripts/utils";


    export let album: Album;
    export let count: number;
    export let duration: number = 0;

</script>
<div class="track-header">
    <div class="text">
        <div class="text-title">
            {album.title}
        </div>
        <div class="text-artist">
            {formatArtists(album.artists)}
        </div>
        <div class="text-info">
            <span class="text-subcategory">
                {album.category}
            </span>
            <b>&#x2022</b>
            <span class="text-count">
                {count} tracks
            </span>
            <b>&#x2022</b>
            <span class="text-duration">
                {formatTime(duration, true)}
            </span>
        </div>
        <div class="text-description">
            {album.year}
        </div>
    </div>
    <div class="art">
        <img class="art-image" src={album.cover.path}>
    </div>
</div>
    
<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .track-header {
		display: flex;
		flex-grow: 1;
		flex-direction: row;
		align-items: center;
		height: $track-header-size;
		padding-left: $track-item-size;
		padding-right: $track-item-size;
		.text {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			.text-title {
				font-size: $size;
				font-weight: bold;
			}
			.text-artist {
				font-size: 12pt;
				font-size: bold;
			}
			.text-info {
				margin-top: $margin-size;
			}
			.text-description {
				margin-top: $margin-size;
				opacity: 70%;
			}
		}
		.art {
			width: calc($track-item-size * 2);
			height: calc($track-item-size * 2);

			.art-image {
				width: inherit;
				height: inherit;
				border-style: solid;
				border-color: $border-color;
				border-width: 1px;
			}
		}
	}
</style>

