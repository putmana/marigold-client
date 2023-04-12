<script>
    import Player from "$lib/components/player/player.svelte";
    import QueueBox from "$lib/components/queue-box/queue-box.svelte";
    import Sidebar from "$lib/components/sidebar/sidebar.svelte";

</script>

<div class="app-container">
    <Sidebar/>
    <slot></slot>
    <QueueBox/>
</div>

<Player/>


<style lang="scss">
    @import '/static/vars.scss';
    .app-container {
        display: flex;
        flex-grow: 1;
        flex-direction: row;
        max-height: calc(100vh - $player-size - $margin-size);
    }
</style>