<script lang="ts">
    import { mode } from "../../stores/mode";
    import AlbumLister from "./subcomponents/panel/album/album-lister.svelte";
    import PlaylistLister from "./subcomponents/panel/playlist/playlist-lister.svelte";
</script>

<div class="panel">
    {#if $mode.content_type === "PLAYLIST"}
        <PlaylistLister />
    {:else if $mode.content_type === "ALBUM"}
        <AlbumLister />
    {:else} 
        error
    {/if}
</div>

<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .panel {
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: $gray-c;
        min-width: $panel-size;
        transition: width $hover-fade-time ease;
        border-top: 1px solid $border-color;
        &::after {
            content: "";
            flex-grow: 1;
            border: 1px solid $border-color;
            border-top: none;
            border-bottom: none;
        }
    }
</style>