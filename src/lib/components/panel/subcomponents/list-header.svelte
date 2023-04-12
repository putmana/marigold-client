<script lang="ts">
    export let label: string;
</script>

<div class="wrapper">
    <div class="label">
        {label}
    </div>
</div>


<style lang="scss">
    @import '/static/vars.scss';
    .wrapper {
        height: $tab-size;
        display: flex;
        align-items: center;
        border: 1px solid $border-color;
        border-top: none;
        border-bottom: none;
    }
    .label {
        font-weight: bold;
        text-transform: uppercase;
        margin-left: calc(3 * $margin-size);
    }
</style>