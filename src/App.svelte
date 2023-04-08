<script lang="ts">

  import Deck from "./lib/components/library/deck.svelte";
  import Panel from "./lib/components/library/panel.svelte";
    import Player from "./lib/components/library/player.svelte";
  import Sidebar from "./lib/components/library/sidebar.svelte";
    import QueueBox from "./lib/components/library/subcomponents/player/queue-box/queue-box.svelte";
  import { mode } from "./lib/stores/mode";

  $: console.log("MODE CHANGED:" + $mode.content_type); 
</script>

<div class="app-wrapper">

  <div class="app-container">
    <!---- SIDEBAR ---->
    <Sidebar/>
    <!---- PANEL ---->
    <Panel/>
    <!---- DECK ---->
    <Deck/>

    <QueueBox/>


  </div>

  <Player/>

  
</div>

<style lang="scss">
  @import "./lib/static/vars.scss";
  :global(body) {
      background-color: $gray-d;
      color: $text-color;
      font-family: "jaf-bernina-sans-narrow", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: $font-size;
  }
  .app-wrapper {
      position: fixed;
      display: flex;
      flex-direction: column;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100vh;
  }
  .app-container {
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      max-height: calc(100vh - $player-size - $margin-size);
  }
  
</style>
