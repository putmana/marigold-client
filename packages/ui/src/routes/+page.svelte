<script lang="ts">
	import BtnIcon from '$lib/components/button/btn-icon.svelte';
	import Textbox from '$lib/components/textbox/textbox.svelte';
	import { Btn } from '$lib/index';
</script>

<div class="row light">
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
		<Textbox id="primary" label="primary" />
		<Textbox id="disabled" label="disabled" disabled />
	</div>
</div>

<div class="row dark">
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
		<Textbox id="primary" label="primary" />
		<Textbox id="disabled" label="disabled" disabled />
	</div>
</div>

<div class="row red">
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
		<Textbox id="primary" label="primary" />
		<Textbox id="disabled" label="disabled" disabled />
	</div>
</div>

<div class="row green">
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
		<Textbox id="primary" label="primary" />
		<Textbox id="disabled" label="disabled" disabled />
	</div>
</div>

<div class="row blue">
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
		<Textbox id="primary" label="primary" />
		<Textbox id="disabled" label="disabled" disabled />
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
		padding: 1rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.light {
		background-color: hsl(0, 0%, 35%);
	}

	.dark {
		background-color: hsl(0, 0%, 25%);
	}

	.red {
		background-color: oklch(50%, 40%, 30);
	}

	.green {
		background-color: oklch(50%, 40%, 160);
	}

	.blue {
		background-color: oklch(50%, 40%, 270);
	}
</style>
