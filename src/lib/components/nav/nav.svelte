<script lang="ts">
	//
</script>

<nav class="wrapper">
	<div class="start">
		<slot />
	</div>

	<div class="end">
		<slot name="end" />
	</div>
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

		div {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: vars.$item_gap;

			&.start {
				flex-grow: 1;
			}
			&.end {
				flex-grow: 0;
			}
		}
	}
</style>
