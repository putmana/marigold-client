<script lang="ts">
    import { deckColors } from "../../../stores/colors";

</script>

<div class="tracklist" style="--main-light: {$deckColors.mainLight}; --main-dark: {$deckColors.mainDark}">
    <slot></slot>
</div>

<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .tracklist {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
        &::after {
            content: "";
            height: $margin-size;
            background-color: linear-gradient(to right, var(--main-light), var(--main-dark));
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: $border-color;
        }
    }
    
</style>