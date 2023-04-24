<script lang="ts">
    import Panel from "$lib/components/panel/panel.svelte";
    import ListHeader from "$lib/components/panel/subcomponents/list-header.svelte";
    import ListItem from "$lib/components/panel/subcomponents/list-item.svelte";
    import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config";
    import { getAllPlaylists } from "$lib/scripts/api/api-playlists";
    import { token } from "$lib/stores/auth";

    $: playlists = getAllPlaylists($token).catch(error => {
        if (error.message === "BAD TOKEN") {
            $token = UNAUTHORIZED_TOKEN
        }
        throw new Error(error)
    })

</script>

<Panel>
    {#await playlists}
    {:then playlists}
        <ListHeader label="Playlists"/>
        {#each playlists as playlist}
            <ListItem route={"/listen/playlists/"+playlist.id} title={playlist.title} artists={playlist.username} cover={playlist.cover.path}/>
        {/each}
    {:catch error}
        <h4>{error}</h4>
    {/await}
</Panel>

<slot></slot>