<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { user } from "$lib/scripts/stores/UserStore"
	import Textbox from "$lib/ui/textbox/textbox.svelte"
	import ButtonText from "$lib/ui/button/button-text.svelte"

	const dispatch = createEventDispatcher()

	let email = ""
	let password = ""
	let issues: string[] = []

	async function login() {
		issues = await user.login(email, password)
	}

	function showRegister() {
		dispatch("showregister")
	}
</script>

<form class="form" on:submit|preventDefault={login}>
	<div class="header">
		<h1>login</h1>
	</div>
	<div class="input">
		<Textbox id="email" type="email" bind:value={email} label="Email" grow />
	</div>

	<div class="input">
		<Textbox id="password" type="password" bind:value={password} label="Password" grow />
	</div>

	<div class="input">
		<ButtonText text="Submit" grow submit />
	</div>
	<div class="footer">
		<p>No account? <button class="link" on:click={showRegister}>Get one</button></p>
	</div>
</form>

<style lang="scss">
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		width: 100%;
		padding: 1rem;

		@include mixins.desktop-only {
			width: 20rem;
		}

		@include mixins.mobile-only {
			width: 80%;
		}

		.header {
			opacity: 80%;
			h1 {
				margin: 0;
				font-size: larger;
			}
		}

		.input {
			width: 100%;
		}

		.footer {
			opacity: 80%;
			p {
				font-size: smaller;
				margin: 0;
			}
			.link {
				@include mixins.link;
			}
		}
	}
</style>
