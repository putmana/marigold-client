<script lang="ts">
    export let category: string;
    export let id: string;
    export let title: string;
    export let artist: string;
    export let art: string;
    export let current: string;

    import { deckPaletteStore } from '../../stores/colors'
    const {css_main_light} = deckPaletteStore;
</script>

<a class="list" class:selected={current === id} style="--main-light: {$css_main_light}" on:click={() => (current = id)} href="/{category}/{id}">
    <div class="art">
        <img class="art-image">
    </div>
    <div class="text">
        <div class="text-title">
            {title}
        </div>
        <div class="text-artist">
            {artist}
        </div>
    </div>
</a>

<style lang="scss">
    @import "../../static/vars.scss";
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
            background-color: black;
        }
        .text {
            display: flex;
            flex-direction: column;
            margin-left: calc(6 * $margin-size);
            .text-artist {
                opacity: 70%;
                font-size: smaller;
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