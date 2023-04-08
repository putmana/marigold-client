<script lang="ts">
    import ListHeader from "../../../subcomponents/panel/shared/list-header.svelte";
    import ListItem from "../shared/list-item.svelte";
    import Loader from "../shared/loader.svelte";
    
    $: playlists = loadPlaylists()

    async function loadPlaylists() {
        return await fetch('https://marigoldapi_s.ptmn.io/api/playlist/')
            .then((response) => {
                return response.json()
            }).then((data) => {
                return data.data as Playlist[]
            }).then ((playlists) => {
                return playlists
            })
    }

</script>


{#await playlists}
    <Loader/>
    {:then playlists}
        <ListHeader label="PLAYLISTS"/>
        {#each playlists as playlist}
            <ListItem id={playlist.id} title={playlist.title} artists={playlist.username} cover={playlist.cover.path}/>
        {/each}
    {:catch error}

{/await}

