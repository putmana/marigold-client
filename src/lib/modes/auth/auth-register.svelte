<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { validateRegistration, type RegistrationIssues } from "./register"
	import { user } from "$lib/scripts/stores/UserStore"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	const dispatch = createEventDispatcher()

	let issues: RegistrationIssues = {
		username: [],
		email: [],
		password: [],
		confirm_password: [],
		generic: []
	}

	let username = ""
	let email = ""
	let password = ""
	let confirm_password = ""

	$: issues = validateRegistration(username, email, password, confirm_password).issues

	async function register() {
		const result = validateRegistration(username, email, password, confirm_password)

		if (result.valid) {
			user.register(username, email, password)
		}
	}

	function showLogin() {
		dispatch("showlogin")
	}
</script>

<form class="form" on:submit|preventDefault={register}>
	<div class="header">
		<h1>register</h1>
	</div>
	<div class="input">
		{#if username.length > 0}
			{#each issues.username as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<Textbox id="username" bind:value={username} label="Username" />
	</div>

	<div class="input">
		{#if email.length > 0}
			{#each issues.email as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<Textbox id="email" bind:value={email} label="Email" />
	</div>

	<div class="input">
		{#if password.length > 0}
			{#each issues.password as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<Textbox id="password" bind:value={password} label="Password" censor />
	</div>

	<div class="input">
		{#if confirm_password.length > 0}
			{#each issues.confirm_password as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}

		<Textbox id="confirm_password" bind:value={confirm_password} label="Confirm Password" censor />
	</div>

	<div class="input">
		{#each issues.generic as issue}
			<p class="issue">{issue}</p>
		{/each}
		<BtnText label="Submit" grow submit />
	</div>
	<div class="footer">
		<p>Have an account? <button class="link" on:click={showLogin}>Log in</button></p>
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
