<script lang="ts">
    import ListItem from "./list-item.svelte";

    let current = "";

    export let category: string;
</script>

<div class="panel">
    
</div>

<style lang="scss">
    @import "../../static/vars.scss";
    .panel {
        position: relative;
        display: flex;
        background-color: $gray-c;
        flex-direction: column;
        width: $panel-size;
        transition: width 0.2s ease;
    }
</style>