<script lang="ts">
    export let text: string = " ";
</script>

<div class="void">
    <div class="icon">
        <i class="bi bi-flower1"></i>
    </div>
    <span class="text">{text}</span>
</div>

<style lang="scss">
    @import "/src/lib/static/vars.scss";
    .void {
        position: relative;
        display: flex;
        background-image: linear-gradient(to right, $gray-a, $gray-b);
        flex-direction: column;
        flex-grow: 1;
        max-height: calc(100vh - $player-size);
        box-shadow: inset 0 0 calc($shadow-size * 2) $shadow-color;
        border-left-style: solid;
        border-left-width: 1px;
        border-left-color: $gray-d;
        justify-content: center;
        align-items: center;
        .icon {
            font-size: $tab-size;
            opacity: 20%;
        }
        .text {
            opacity: 20%;
            font-weight: bold;
        }
    }
</style>