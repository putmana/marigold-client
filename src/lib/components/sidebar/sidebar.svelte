<script lang="ts">
    import Tab from "./subcomponents/tab.svelte";

    let expanded = false;

    function expand() {
        expanded = true;
    }

    function collapse() {
        expanded = false;
    }


</script>

<div class="sidebar" class:expanded={expanded} on:mouseenter="{expand}" on:mouseleave="{collapse}">
    <Tab route="/listen/playlists" label="PLAYLIST" expanded={expanded}>
        <i class="bi bi-music-note-list"></i>
    </Tab>
    <Tab route="/listen/albums" label="ALBUM" expanded={expanded}> 
        <i class="bi bi-vinyl"></i>
    </Tab>
    <Tab route="/listen/artists" label="ARTIST" expanded={expanded}>
        <i class="bi bi-person"></i>
    </Tab>
</div>

<style lang="scss">
    @import "/static/vars.scss";

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