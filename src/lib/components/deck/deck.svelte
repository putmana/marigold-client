<script lang="ts">
    import { buildPalette } from '$lib/scripts/palette';
    import { deckPalette, defaultColor } from '$lib/stores/colors';
    import { onDestroy } from 'svelte';

    onDestroy(() => {
        $deckPalette = buildPalette(defaultColor)
    })
</script>

<div class="deck" style="--main-light: {$deckPalette.main.light}; --main-dark: {$deckPalette.main.dark}">
    <slot></slot>
</div>

<style lang="scss">
    @import "/static/vars.scss";
    .deck {
        position: relative;
        display: flex;
        overflow-y: scroll;
        background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
        flex-direction: column;
        flex-grow: 1;
        transition: width $hover-fade-time ease;
    }
    
</style>