<script lang="ts">
    import Panel from "$lib/components/panel/panel.svelte";
    import ListHeader from "$lib/components/panel/subcomponents/list-header.svelte";
    import ListItem from "$lib/components/panel/subcomponents/list-item.svelte";

    $: playlists = loadPlaylists()

    async function loadPlaylists() {
        return await fetch('http://localhost/api/playlist/')
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as Playlist[]
            }).then ((albums) => {
                return albums
            })
    }

</script>

<Panel>
    {#await playlists}
    {:then playlists}
        <ListHeader label="Playlists"/>
        {#each playlists as playlist}
            <ListItem route={"/listen/playlists/"+playlist.id} title={playlist.title} artists={playlist.username} cover={playlist.cover.path}/>
        {/each}
    {/await}
</Panel>

<slot></slot>