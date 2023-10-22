<script lang="ts">
	import { mode, type Mode } from "$lib/scripts/stores/ModeStore"
	export let label: string
	export let iconPath: string
	export let tab: Mode

	$: enabled = $mode === tab

	function switchMode() {
		$mode = tab
	}
</script>

<button class="btn" class:enabled on:click={switchMode}>
	<img class="icon" src={iconPath} alt={"Icon for " + label} />
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.btn {
		@include mixins.clickable;

		position: relative !important;
		display: flex;
		justify-content: center;
		align-items: center;

		box-sizing: border-box;
		width: sizes.$nav-width;
		height: sizes.$nav-width;

		.icon {
			height: calc(sizes.$nav-width / 3);
		}
		&.enabled {
			background-color: colors.$gray-c;
			border: 1px solid colors.$border;
			&::after {
				content: "";
				box-sizing: border-box;
				border-top: 1px solid colors.$border;
				border-bottom: 1px solid colors.$border;
				background-color: colors.$gray-c;
				position: absolute;
				height: inherit;
				width: 2px;
				right: -2px;
			}
		}
	}
</style>
