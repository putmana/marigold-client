<script lang="ts">
    import { goto } from "$app/navigation";
    import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config";
    import { getUser } from "$lib/scripts/api/api-user";
    import { logoutUser } from "$lib/scripts/api/auth/api-login";
    import { token } from "$lib/stores/auth";
    import Tab from "./subcomponents/tab.svelte";

    let expanded = false;

    let username = getUser($token).catch(error => {
        return "INVALID USER"
    })

    function expand() {
        expanded = true;
    }

    function collapse() {
        expanded = false;
    }


</script>

<div class="sidebar" class:expanded={expanded} on:mouseenter="{expand}" on:mouseleave="{collapse}">
    <Tab route="/listen/playlists" label="PLAYLISTS" expanded={expanded}>
        <i class="bi bi-music-note-list"></i>
    </Tab>
    <Tab route="/listen/albums" label="ALBUMS" expanded={expanded}> 
        <i class="bi bi-vinyl"></i>
    </Tab>
    {#await username}
    {:then username}
    <Tab route="/auth/login" label="LOGOUT" expanded={expanded}>
        <i class="bi bi-box-arrow-left"></i>
    </Tab>
    {:catch error}
        {error}
    {/await}
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