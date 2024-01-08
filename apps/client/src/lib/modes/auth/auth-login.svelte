<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { user } from "$lib/scripts/stores/UserStore"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

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
		<Textbox id="email" bind:value={email} label="Email" />
	</div>

	<div class="input">
		<Textbox id="password" bind:value={password} label="Password" censor />
	</div>

	<div class="input">
		{#each issues as issue}
			<p class="issue">{issue}</p>
		{/each}

		<BtnText label="Submit" grow submit />
	</div>
	<div class="footer">
		<p>No account? <button class="link" on:click={showRegister}>Get one</button></p>
	</div>
</form>

<style lang="scss">
	@use "/src/style/mixins";
	@use "/src/style/colors";

	$error-red: hsl(0, 100, 80);

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 30px;
		width: 100%;
		padding: 15px;

		@include mixins.desktop-only {
			width: 300px;
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

			.issue {
				color: $error-red;
				font-size: smaller;
				margin: 5px 0;
			}
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
