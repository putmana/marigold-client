<script lang="ts">
    import Sidebar from "../lib/components/sidebar.svelte";
    import Player from "../lib/components/player.svelte";

    let mode = "";
</script>

<div class="app-wrapper">
    <div class="app-container">
        <Sidebar bind:mode/>
        {#if mode === "playlists"}

        {:else if mode === "albums"}

        {/if}
    </div>
    <Player/>
</div>

<style lang="scss">
    @import "../static/vars.scss";
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
