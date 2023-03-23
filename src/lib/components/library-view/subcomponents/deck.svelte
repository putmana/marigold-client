<script lang="ts">
    import { fly } from 'svelte/transition';
    import { deckColors } from '../../../stores/colors'
    import { current } from '../../../stores/view-playlists';
</script>

<div transition:fly="{{x: 200, duration: 200}}" class="deck" style="--background-light: {$deckColors.backgroundLight}; --background-dark: {$deckColors.backgroundDark}">
    <slot></slot>
</div>

<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .deck {
        position: relative;
        display: flex;
        background-image: linear-gradient(to right, var(--background-light), var(--background-dark));
        flex-direction: column;
        flex-grow: 1;
        transition: width 0.2s ease;
        overflow-y: scroll;
        max-height: calc(100vh - $player-size);
        &::after {
            content: "";
            flex-grow: 1;
            box-shadow: inset 0 0 calc($shadow-size * 2) $shadow-color;
            border-left-style: solid;
            border-left-width: 1px;
            border-left-color: $gray-d;
        }
    }
</style>