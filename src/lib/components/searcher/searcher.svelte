<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import SearcherItem from "./subcomponents/searcher-item.svelte";

    export let name: string;
    export let items: SearchItem[];
    export let showImage = false;
    export let showAdd = false;
    


    const dispatch = createEventDispatcher();

    $: newItem = {
        id: "new",
        label: "Create new " + name,
        image: "/public/img/mg/covers/default.png"
    }

    let query = ""

    $: results = items.filter(item => 
        item.label.toLowerCase().includes(query.toLowerCase())
    )

    function handleSelect(e: CustomEvent) {
        dispatch('select', {
            item: e.detail.id
        })
        query = "";
    }

</script>

<div class="wrapper">
    <input class="form-control search" type="text" placeholder="Search {name}" bind:value={query}>

    <div class="result-box">
        {#each results as result}
            <SearcherItem item={result} on:select={handleSelect}/>
        {/each}
        <SearcherItem item={newItem} on:select={handleSelect}/>
    </div>
    

</div>

<style lang="scss">
    @import '/static/vars.scss';
    @import '/static/style.scss';
    .wrapper {
        box-sizing: border-box;
        width: 100%;
        background-color: $hover-color;
        padding: calc(2 * $margin-size);
        border: 1px solid $border-color;
        border-radius: $margin-size;
    }
    .search {
        margin-bottom: calc(2 * $margin-size);
    }
    .result-box {
        padding: $margin-size;
        max-height: 100%;
        overflow-y: scroll;
    }
</style>

