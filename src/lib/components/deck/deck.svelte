<script lang="ts">
    import { deckPalette } from '$lib/stores/colors';
</script>

<div class="deck" style="--main-light: {$deckPalette.main.light}; --main-dark: {$deckPalette.main.dark}">
    <slot></slot>
</div>

<style lang="scss">
    @import "/static/vars.scss";
    .deck {
        position: relative;
        display: flex;
        background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
        flex-direction: column;
        flex-grow: 1;
        transition: width $hover-fade-time ease;

    }
    
</style>