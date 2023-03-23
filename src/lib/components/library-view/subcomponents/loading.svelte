<script lang="ts">
    export let text: string = "loading...";
</script>

<div class="wrapper">
    <span class="text">
        {text}
    </span>
</div>

<style lang="scss">
    .wrapper {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
            opacity: 70%;
            font-weight: bold;
        }
    }
</style>