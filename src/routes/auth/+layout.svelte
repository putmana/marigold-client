<script lang="ts">
    import { crossfade } from "svelte/transition";
    import { quintOut } from 'svelte/easing'
    import { randomPalette } from "$lib/scripts/palette";
    import { onMount } from "svelte";
    import { token } from "$lib/stores/auth";
    import { goto } from "$app/navigation";
    import { verifyToken } from "$lib/scripts/api/api-verify-token";
    import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config";
    import { logoutUser } from "$lib/scripts/api/auth/api-login";

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

    onMount(() => {
        verifyToken($token).then(valid => {
            if (valid) {
                logoutUser($token)
                $token = UNAUTHORIZED_TOKEN
            }
        })
        
    })


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