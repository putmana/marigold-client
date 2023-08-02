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
    <div class="overlay">
        <div class="logo">
            <i class="bi bi-flower1"></i>
        </div>
        <p>
            Demo for Marigold is not currently compatible with mobile displays.
        </p>
        <a class="btn btn-primary" href="https://ptmn.io/">
            Go Back To Portfolio
        </a>
    </div>
    <slot></slot>
</div>

<style lang="scss">
    @import "/static/vars.scss";
    @import "/static/buttons.scss";
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
    .overlay {
        display: none;
    }
    @media (max-width: 1000px) {
        .overlay {
            background-color: $gray-c;
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
            box-sizing: content-box;
            z-index: 9999;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: bold;
            .logo {
                font-size: 48pt;
                opacity: 60%;
            }
            p {
                padding: 20px;
            }
        }
    }
</style>