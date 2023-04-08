<script lang="ts">
    import Tab from "./subcomponents/sidebar/tab.svelte";

    let expanded = false;

    function expand() {
        expanded = true;
    }

    function collapse() {
        expanded = false;
    }


</script>

<div class="sidebar" class:expanded={expanded} on:mouseenter="{expand}" on:mouseleave="{collapse}">
    <Tab id="PLAYLIST" label="PLAYLIST" expanded={expanded}>
        <i class="bi bi-music-note-list"></i>
    </Tab>
    <Tab id="ALBUM" label="ALBUM" expanded={expanded}> 
        <i class="bi bi-vinyl"></i>
    </Tab>
    <Tab id="ARTIST" label="ARTIST" expanded={expanded}>
        <i class="bi bi-person"></i>
    </Tab>
</div>

<style lang="scss">
    @import "/src/lib/static/vars.scss";

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