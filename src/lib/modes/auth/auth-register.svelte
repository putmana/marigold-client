<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { registerUser, validateRegistration, type RegistrationIssues } from "./register"

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
			await registerUser(username, email, password)
				.then((_) => showLogin())
				.catch((error) => (issues.generic = [error]))
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
		<label for="username" class="input-label">Username</label>
		<input
			id="username"
			name="username"
			type="text"
			class="input-text"
			bind:value={username}
			placeholder="username"
			class:error={issues.username.length > 0 && username.length > 0}
			required
		/>
	</div>

	<div class="input">
		{#if email.length > 0}
			{#each issues.email as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<label for="email" class="input-label">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			class="input-text"
			bind:value={email}
			placeholder="email"
			class:error={issues.email.length > 0 && email.length > 0}
			required
		/>
	</div>

	<div class="input">
		{#if password.length > 0}
			{#each issues.password as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<label for="password" class="input-label">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			class="input-text"
			bind:value={password}
			placeholder="password"
			class:error={issues.password.length > 0 && password.length > 0}
			required
		/>
	</div>

	<div class="input">
		{#if confirm_password.length > 0}
			{#each issues.confirm_password as issue}
				<p class="issue">{issue}</p>
			{/each}
		{/if}
		<label for="confirm_password" class="input-label">Confirm Password</label>
		<input
			id="confirm_password"
			name="confirm_password"
			type="password"
			class="input-text"
			bind:value={confirm_password}
			placeholder="confirm password"
			class:error={issues.confirm_password.length > 0 && confirm_password.length > 0}
			required
		/>
	</div>

	<div class="input">
		{#each issues.generic as issue}
			<p class="issue">{issue}</p>
		{/each}
		<input type="submit" class="input-submit" value="Submit" />
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
			.input-label {
				position: absolute;
				visibility: hidden;
			}
			.issue {
				color: $error-red;
				font-size: smaller;
				margin: 5px 0;
			}

			.input-text {
				@include mixins.textbox;
				&.error {
					border-color: $error-red;
					outline-color: $error-red;
				}
			}

			.input-submit {
				@include mixins.button;
				width: 100%;
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
