<script lang="ts">
    import { deckPalette } from "../../../../../stores/colors";
</script>

<div class="tracklist" style="--main-light: {$deckPalette.main.light}; --main-dark: {$deckPalette.main.dark}">
    <slot></slot>
</div>
<div class="footer">

</div>
<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .tracklist {
        display: flex;
        flex-direction: column;
        background-color: var(--main-light);
        margin: $margin-size;
        background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
        overflow-x: hidden;
        overflow-y: auto;
        &::after {
            content: "";
            width: calc(100% - 2 * $margin-size);
            align-self: center;
            min-height: calc(2 * $margin-size);
            background-color: linear-gradient(to right, var(--main-light), var(--main-dark));
            border-bottom: 1px solid $border-color;
            margin-bottom: $track-item-size;
        }
    }
    
    
    
</style>