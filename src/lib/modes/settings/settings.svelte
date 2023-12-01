<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import Finder from "$lib/components/finder/finder.svelte"
	import Viewer from "$lib/components/viewer/viewer.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { user } from "$lib/scripts/stores/UserStore"

	let hidden = true
</script>

<Finder title="settings">
	<svelte:fragment slot="header">
		<BtnText
			label="Log Out"
			on:click={() => {
				user.logout()
			}}
			smaller
		/>
	</svelte:fragment>
	<svelte fragment slot="body">
		<div class="placeholder">
			<p>Here be dragons</p>
		</div>
	</svelte>
</Finder>
<Viewer bind:hidden empty palette={Palette.gray} />

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
