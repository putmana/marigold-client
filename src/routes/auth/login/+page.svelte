<script lang="ts">
	import { goto } from "$app/navigation"
	import InfoBanner from "$lib/components/misc/info-banner.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
	import { loginUser } from "$lib/scripts/api/auth/api-login"
	import { token } from "$lib/stores/auth"

	const DEMO_EMAIL = "demo@ptmn.io"
	const DEMO_PASS = "password"

	let email = DEMO_EMAIL
	let password = DEMO_PASS

	let errors: string[] = []

	async function handleSubmit() {
		await loginUser(email, password)
			.then((token) => {
				$token = token
				goto("/listen")
			})
			.catch((error) => {
				$token = UNAUTHORIZED_TOKEN
				console.log("ERROR CAUGHT")

				if (error.message == "BAD CREDENTIALS") {
					let message = "Invalid email or password"
					errors = [...errors, message]
					password = DEMO_PASS
				} else {
					let message = "ERROR: " + error.message
					errors = [...errors, message]
					email = DEMO_EMAIL
					password = DEMO_PASS
				}
			})
	}
</script>

<div class="banners">
	{#each errors as message}
		<InfoBanner {message} style="error" />
	{/each}
</div>

<div class="watermark">
	<div class="logo">
		<i class="bi bi-flower1"></i>
	</div>
	<div class="text">login (demo)</div>
</div>
<form on:submit|preventDefault={handleSubmit}>
	<div class="input">
		<input
			class="input-text"
			name="email"
			type="email"
			placeholder="email address"
			bind:value={email}
			required
			disabled
		/>
	</div>
	<div class="input">
		<input
			class="input-text"
			name="password"
			type="password"
			placeholder="password"
			bind:value={password}
			required
			disabled
		/>
	</div>
	<div class="input">
		<input class="btn-primary" type="submit" value="LOG IN" />
	</div>
	<div class="subtitle">
		Need an account?
		<a href="/auth/register">Get one</a>
	</div>
</form>

<style lang="scss">
	@import "../style.scss";
</style>
