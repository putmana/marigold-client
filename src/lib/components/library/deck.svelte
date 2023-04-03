<script lang="ts">
    import { fly } from 'svelte/transition';
    import { deckColors } from '../../stores/colors';
    import { mode } from '../../stores/mode';
    import AlbumLoader from './subcomponents/deck/album/album-loader.svelte';
    import PlaylistLoader from './subcomponents/deck/playlist/playlist-loader.svelte';
    import Void from './subcomponents/deck/shared/void.svelte';
</script>

<div transition:fly="{{x: 200, duration: 200}}" class="deck" style="--background-light: {$deckColors.backgroundLight}; --background-dark: {$deckColors.backgroundDark}">
    {#if $mode.content_type === "PLAYLIST"}
        <PlaylistLoader />
    {:else if $mode.content_type === "ALBUM"}
        <AlbumLoader />
    {:else if $mode.content_type === "ARTIST"}
        <Void />
    {/if}
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
    }
    
</style>