<script lang="ts">

  import Deck from "./lib/components/library/deck.svelte";
  import Panel from "./lib/components/library/panel.svelte";
    import Player from "./lib/components/library/player.svelte";
  import Sidebar from "./lib/components/library/sidebar.svelte";
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
      height: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
  }
  .app-container {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
  }
</style>
