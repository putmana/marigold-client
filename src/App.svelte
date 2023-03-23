<script lang="ts">
  import Sidebar from "./lib/components/sidebar.svelte";
  import Player from "./lib/components/player.svelte";
    import PlaylistView from "./lib/components/library-view/playlist-view.svelte";
    import AlbumView from "./lib/components/library-view/album-view.svelte";

  import { mode } from "./lib/stores/mode";
    import Void from "./lib/components/library-view/subcomponents/void.svelte";
    import AudioCycler from "./lib/components/library-view/subcomponents/audio-cycler.svelte";

  $: console.log("MODE CHANGED:" + $mode); 
</script>

<div class="app-wrapper">
  <div class="app-container">
      <Sidebar/>
      {#if $mode === "playlist-view"}
        <PlaylistView/>
      {:else if $mode === "album-view"}
        <AlbumView/>
      {:else}
        <Void text="there's nothing here"/>
      {/if}
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
