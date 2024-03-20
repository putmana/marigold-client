<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { user } from "$lib/scripts/stores/UserStore"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"
	import Button from "$lib/ui/button/button.svelte"

	let hidden = true
</script>

<Finder title="Settings">
	<svelte:fragment slot="header">
		<ButtonIcon
			src="public/icons/logout.svg"
			alt="Log out"
			on:click={user.logout}
			tooltip="Log out"
			seamless
			nopadding
		/>
	</svelte:fragment>
	<svelte fragment slot="body">
		<div class="placeholder">
			<p>Here be dragons</p>
		</div>
	</svelte>
</Finder>

<style lang="scss">
	@use "src/style/colors";
	@use "src/style/mixins";

	.placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: lowercase;
		font-style: italic;
		font-size: smaller;
		height: 300px;
		opacity: 50%;
	}
</style>
