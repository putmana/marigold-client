<script lang="ts">
    import { mode } from "../../../../../stores/mode";
    import { deckColors } from "../../../../../stores/colors";

    export let id: string;
    export let title: string;
    export let artists: string;
    export let cover: string;

    $: current = $mode.content_id

    

</script>

<a class="list" class:selected={$mode.content_id == id} style="--main-light: {$deckColors.mainLight}" on:click={() => {$mode.content_id = id}}>
    <div class="art">
        <img class="art-image" src={cover}>
    </div>
    <div class="text">
        <div class="text-title">
            {title}
        </div>
        <div class="text-artist">
            {artists}
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
            .text-artist {
                font-size: smaller;
                opacity: 70%;
            }
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