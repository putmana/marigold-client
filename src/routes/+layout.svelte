<script lang="ts">
    export const ssr = false;
</script>


<div class="app-wrapper">
    <slot></slot>
</div>

<style lang="scss">
    @import "/static/vars.scss";
    :global(body) {
        background-color: $gray-d;
        color: $text-color;
        font-family: "jaf-bernina-sans-narrow", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: $font-size;
    }
    .app-wrapper {
        position: fixed;
        display: flex;
        flex-direction: column;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    }
</style>