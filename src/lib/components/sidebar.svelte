<script lang="ts">
    import Tab from "./tab.svelte";

    let expanded = false;


    function expand() {
        expanded = true;
    }

    function collapse() {
        expanded = false;
    }


</script>

<div class="sidebar" class:expanded={expanded} on:mouseenter="{expand}" on:mouseleave="{collapse}">
    <Tab id="playlist-view" label="PLAYLISTS" expanded={expanded}>
        <i class="bi bi-music-note-list"></i>
    </Tab>
    <Tab id="album-view" label="ALBUMS" expanded={expanded}> 
        <i class="bi bi-vinyl"></i>
    </Tab>
    <Tab id="artist-view" label="ARTISTS" expanded={expanded}>
        <i class="bi bi-person"></i>
    </Tab>
    <Tab id="search-view" label="SEARCH" expanded={expanded}>
        <i class="bi bi-file-music"></i>
    </Tab>
</div>

<style lang="scss">
    @import "../static/vars.scss";

    .sidebar {
        position: relative;
        display: flex;
        background-color: $gray-b;
        flex-direction: column;
        width: $sidebar-size-collapsed;
        transition: width 0.2s ease;
        &.expanded {
            width: $sidebar-size-expanded;
        }
    }
   
</style>