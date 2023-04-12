<script lang="ts">
    import { randomPalette } from "../../scripts/palette";
    import { crossfade, fade, fly, scale } from "svelte/transition";
    import { flip } from 'svelte/animate'
    import { quintOut } from 'svelte/easing'

    // <---- ANIMATION ---->
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

    let page: "LOG IN" | "REGISTER" = "LOG IN";

    let registerFields = [
        "watermark",
        "email",
        "username",
        "password",
        "confirm password",
        "submit",
        "subtitle"
    ]

    let loginFields = [
        "watermark",
        "username",
        "password",
        "submit",
        "subtitle"
    ]

    let fields = loginFields;

    $: if (page === "REGISTER") {
        fields = registerFields
    } else {
        fields = loginFields
    }

    function togglePage() {
        page = (page === "REGISTER") ? "LOG IN" : "REGISTER"
    }
    



</script>

<div class="wrapper" style="--dim-light: {colors.dim.light}; --dim-dark: {colors.dim.dark}; --main-light: {colors.main.light}; --bright-light: {colors.bright.light};">
    <form>
        {#each fields as field (field)}
            <div class="input" in:receive="{{key: field}}" out:send="{{key: field}}" animate:flip="{{duration: 500}}">
                {#if field === "watermark"}     
                    <div class="watermark">
                        <div class="logo">
                            <i class="bi bi-flower1"></i>
                        </div>
                        <div class="text">
                            {page}
                        </div>
                    </div>
                {:else if field === "email"}
                    <input class="input-text" type="email" placeholder={field}>
                {:else if field === "username"}
                    <input class="input-text" type="text" placeholder={field}>
                {:else if field === "password" || field === "confirm password"}
                    <input class="input-text" type="password" placeholder={field}>
                {:else if field === "subtitle"}
                    <div class="subtitle">
                        {#if page === "REGISTER"}
                            Have an account?
                            <a href="#" on:click={togglePage}>Log in</a>
                        {:else}
                            Need an account?
                            <a href="#" on:click={togglePage}>Get one</a>
                        {/if}
                        
                    </div>
                {:else if field === "submit"}
                    <input class="btn-primary" type="submit" value={page}>
                {:else}
                    <input class="input-text" type="text" placeholder={field}>
                {/if}
            </div>
        {/each}
    </form>
</div>

<style lang="scss">
    @import '/src/lib/static/vars.scss';

    .wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-image: linear-gradient(to right, var(--dim-light), var(--dim-dark));
    }
    .watermark {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        margin-bottom: calc(6 * $margin-size);
        color: var(--bright-light);

        .logo {
            font-size: $auth-logo-size;
            margin-bottom: calc(2 * $margin-size);
        }
        .text {
            margin-bottom: $margin-size;
            font-size: larger;
            font-weight: bold;
            text-transform: lowercase;
        }
        
    }
    form {
        padding-bottom: calc(2 * $size);
        width: $auth-input-size;
        .input {
            margin-bottom: calc(6 * $margin-size);
            width: 100%;
        }
        .input-text {
            width: 100%;
            color: $text-color;
            padding: calc(2 * $margin-size);
            box-sizing: border-box;
            border: 1px solid $border-color;
            border-radius: $margin-size;
            background-color: $auth-input-color;
            transition: all $hover-fade-time ease;
            &::placeholder {
                color: $border-color-hover;
            }
            &:hover {
                background-color: $auth-input-color-focus;
                border: 1px solid $border-color-hover;
            }
            &:focus, &:focus-visible {
                appearance: none;
                outline: none;
                background-color: $auth-input-color-focus;
                border: 1px solid var(--bright-light);
                outline: var(--bright-light) solid 2px;
            }
        }
        .btn-primary {
            &:focus, &:focus-visible {
                border-color: var(--bright-light);
                outline: var(--bright-light) solid 2px;
            }
        }
        .subtitle {
            font-size: smaller;
            text-align: center;
            color: $auth-text-color;
            a {
                color: $auth-text-color;
                color: var(--bright-light);
                font-weight: bold;
                text-decoration: none;
                border-radius: calc(1/2 * $margin-size);
                transition: all $hover-fade-time ease;
                &:hover {
                    color: var(--main-light);
                    cursor: pointer;
                }
                &:focus, &:focus-visible {
                    outline: var(--main-light) solid 2px;
                    color: var(--main-light);
                }
            }
        }
    }
</style>