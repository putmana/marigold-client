<script lang="ts">
	export let label: string;
	export let icon_path: string; 
</script>

<button class="btn">
	<img class="icon" src={icon_path} alt={"Icon for " + label}>
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.btn {
		@include mixins.clickable;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: sizes.$nav-width;
		height: sizes.$nav-width;

		box-sizing: content-box;
		.icon {
			height: calc(sizes.$nav-width / 3);
		}
	}
</style>
