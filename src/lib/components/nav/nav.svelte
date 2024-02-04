<script lang="ts">
	//
</script>

<nav class="wrapper">
	<slot />
</nav>

<style lang="scss">
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";
	@use "/src/lib/ui/vars";

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: vars.$item_gap;
	}
</style>
