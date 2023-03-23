<script lang="ts">
    import { playerColors } from '../stores/colors'
    import { queue, queueLoaded, unique, repeat, shuffle } from '../stores/player'
    import AudioPlayer from './library-view/subcomponents/audio-player.svelte';
</script>

<div class="player" style="--main-light: {$playerColors.mainLight}; --main-dark: {$playerColors.mainDark}">
    {#if $queueLoaded}
        <AudioPlayer bind:queue={$queue} bind:repeat={$repeat} bind:shuffle={$shuffle} bind:unique={$unique}/>
    {/if}
</div>



<style lang="scss">
    @import "../static/vars.scss";
    .player {
        z-index: 2;
        height: $player-size;
        display: flex;
        background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
        border-top-color: $border-color;
        border-top-style: solid;
        border-top-width: $border-size;
        box-shadow: 0 calc($shadow-size * -1) calc($shadow-size * 2) $shadow-color; 
    }
</style>