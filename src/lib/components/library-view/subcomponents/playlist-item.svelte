<script lang="ts">
    export let playlist: Playlist;

    import { current } from "../../../stores/view-playlists";
    import { deckColors } from "../../../stores/colors";

</script>

<a class="list" class:selected={$current === playlist.id} style="--main-light: {$deckColors.mainLight}" on:click={() => {$current = playlist.id}}>
    <div class="art">
        <img class="art-image" src={playlist.cover.path}>
    </div>
    <div class="text">
        <div class="text-title">
            {playlist.title}
        </div>
    </div>
</a>

<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .list {
        display: flex;
		flex-direction: row;
        background-image: linear-gradient(to left, $gray-d, $gray-c);
		height: $list-item-size;
		align-items: center;
        .art {
            margin-left: $margin-size;
            height: calc($list-item-size - 2 * $margin-size);
            width: calc($list-item-size - 2 * $margin-size);
            .art-image {
                height: inherit;
                width: inherit;
            }
        }
        .text {
            display: flex;
            flex-direction: column;
            margin-left: calc(6 * $margin-size);
        }
        &:hover {
            background-image: linear-gradient(to left, $gray-f, $gray-e);
        }
        &.selected {
            background-image: linear-gradient(to left, var(--main-light), $gray-c);
            font-weight: bold;
            &:hover {
                background-image: linear-gradient(to left, var(--main-light), $gray-e);
            }
        }
    }
    a {
        color: $text-color;
        text-decoration: none;
    }
</style>