<script lang="ts">
	export let current: number = 0
	export let total: number = 0

	$: progress = (current / total) * 100
</script>

<div class="wrapper">
	<div class="progress" style={`--progress: ${progress}%;`} />
</div>

<style lang="scss">
	@use "src/style/colors";
	@use "src/style/mixins";

	.wrapper {
		overflow: hidden;

		box-sizing: border-box;
		width: inherit;

		background-color: colors.$item;

		outline: 1px solid colors.$border;
		outline-offset: -1px;
		border-radius: 5px;

		.progress {
			width: var(--progress);
			height: 5px;

			background-color: colors.$white-a;

			transition: width 0.2s ease;
		}
	}
</style>
