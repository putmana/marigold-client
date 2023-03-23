<script lang="ts">
    import Panel from "../../lib/components/panel.svelte";
    import PlaylistItem from "../../lib/components/playlist-item.svelte";
    import { mode } from "../../stores/mode";

    import type { LayoutData } from "./$types";
    
    $mode = "playlists";

    export let data: LayoutData;
    const playlists: Playlist[] = data.playlists

    import { playerPaletteStore } from "../../stores/colors";
    playerPaletteStore.updateColor(playlists[0].cover.color)

</script>

<Panel>
    {#each playlists as playlist}
        <PlaylistItem playlist={playlist}/>
    {/each}
</Panel>
<slot></slot>

<style lang="scss">
    @import "../../static/vars.scss";
</style>