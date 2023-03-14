<script lang="ts">
    import { deckPaletteStore } from '../../stores/colors'
    const {css_background_light, css_background_dark} = deckPaletteStore;
</script>

<div class="deck"  style="--background-light: {$css_background_light}; --background-dark: {$css_background_dark}">
    This is the deck
</div>

<style lang="scss">
    @import "../../static/vars.scss";
    .deck {
        position: relative;
        display: flex;
        background-image: linear-gradient(to right, var(--background-light), var(--background-dark));
        flex-direction: column;
        flex-grow: 1;
        transition: width 0.2s ease;

        justify-content: center;
        align-items: center;
    }
</style>