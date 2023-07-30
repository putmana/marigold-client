<script lang="ts">

    import { goto } from "$app/navigation";
    import { verifyToken } from "$lib/scripts/api/api-verify-token";
    import { token } from "$lib/stores/auth";
    import { onMount } from "svelte";

    

    async function checkToken(token: string) {
        await (verifyToken(token)).then(valid => {
            if (valid) {
                goto('/listen')
            } else {
                goto('/auth/login')
            }
        })
    }

    onMount(() => checkToken($token));



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