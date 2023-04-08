<script lang="ts">
    import { playerPalette } from '../../stores/colors'
    import Controller from './subcomponents/player/controller/controller.svelte';
    import QueueBox from './subcomponents/player/queue-box/queue-box.svelte';
</script>

<div class="player" style="--main-light: {$playerPalette.main.light}; --main-dark: {$playerPalette.main.dark}">
    <Controller/>
</div>



<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .player {
        min-height: calc($player-size + $margin-size);
        z-index: 2;
        background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
        //box-shadow: 0 calc($shadow-size * -1) calc($shadow-size * 2) $shadow-color;
        
    }
</style>