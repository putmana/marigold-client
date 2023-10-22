<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { loginUser } from "./login"
	import type { ValidationIssue } from "./validate"

	const dispatch = createEventDispatcher()

	let email = ""
	let password = ""
	let issues: string[] = []

	async function login() {
		await loginUser(email, password).catch(
			(error) => (issues = ["Login failed. Check your email and password."])
		)
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
		<label for="email" class="input-label">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			class="input-text"
			bind:value={email}
			placeholder="email"
		/>
	</div>

	<div class="input">
		<label for="password" class="input-label">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			class="input-text"
			bind:value={password}
			placeholder="password"
		/>
	</div>

	<div class="input">
		{#each issues as issue}
			<p class="issue">{issue}</p>
		{/each}

		<input type="submit" class="input-submit" value="Submit" />
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
