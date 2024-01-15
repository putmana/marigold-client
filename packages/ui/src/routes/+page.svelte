<script lang="ts">
	import BtnIcon from '$lib/components/button/btn-icon.svelte';
	import Textbox from '$lib/components/textbox/textbox.svelte';
	import { Btn } from '$lib/index';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="row">
	<div class="list">
		<Btn>Primary</Btn>
		<Btn variant="invisible">Invisible</Btn>
	</div>
	<div class="list">
		<Btn disabled>Disabled</Btn>
		<Btn variant="invisible" disabled>Disabled</Btn>
	</div>
	<div class="list">
		<BtnIcon src="/public/icons/save.svg" alt="Save icon"></BtnIcon>
		<BtnIcon variant="invisible" src="/public/icons/save.svg" alt="Save icon"></BtnIcon>
	</div>
	<div class="list">
		<Textbox id="textbox" label="textbox" />
		<Textbox id="textbox" label="textbox" disabled />
	</div>
</div>

<style lang="scss">
	@use '../lib/components/globals';
	@use '/static/style/fonts.scss';
	:global(body) {
		@include globals.default;
		font-family: fonts.$mona_sans_narrow;
	}

	.row {
		display: flex;
		gap: 0.5rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
