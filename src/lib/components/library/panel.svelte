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
        background-color: $gray-c;
        flex-direction: column;
        width: $panel-size;
        transition: width $hover-fade-time ease;
    }
</style>