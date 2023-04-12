<script lang="ts">
    import { crossfade } from "svelte/transition";
    import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
    import { randomPalette } from "$lib/scripts/palette";

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 600),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `
            };
        }
    })

    let colors: Palette = randomPalette()

</script>

<div class="wrapper" style="--dim-light: {colors.dim.light}; --dim-dark: {colors.dim.dark}; --main-light: {colors.main.light}; --bright-light: {colors.bright.light};">
    <slot></slot>
</div>
<style lang="scss">
    @import '/static/vars.scss';

    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-image: linear-gradient(to right, var(--dim-light), var(--dim-dark));
    }
    
</style>