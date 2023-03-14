<script lang="ts">
    import Tab from "./tab.svelte";

    let expanded = false;
    let current = "";

    function expand() {
        expanded = true;
    }

    function collapse() {
        expanded = false;
    }


</script>

<div class="sidebar" class:expanded={expanded} on:mouseenter="{expand}" on:mouseleave="{collapse}">
    <Tab id="playlists" label="PLAYLISTS" expanded={expanded} bind:current>
        <i class="bi bi-music-note-list"></i>
    </Tab>
    <Tab id="albums" label="ALBUMS" expanded={expanded} bind:current> 
        <i class="bi bi-vinyl"></i>
    </Tab>
    <Tab id="artists" label="ARTISTS" expanded={expanded} bind:current>
        <i class="bi bi-person"></i>
    </Tab>
    <Tab id="search" label="SEARCH" expanded={expanded} bind:current>
        <i class="bi bi-file-music"></i>
    </Tab>
</div>

<style lang="scss">
    @import "../../static/vars.scss";

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