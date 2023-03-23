<script lang="ts">

</script>

<div class="panel">
    <slot></slot>
</div>

<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .panel {
        position: relative;
        display: flex;
        background-color: $gray-c;
        flex-direction: column;
        width: $panel-size;
        transition: width $hover-fade-time ease;
    }
</style>