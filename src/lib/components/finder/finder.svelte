<script lang="ts">
	export let title: string
</script>

<aside class="wrapper">
	<header class="header">
		<h1>{title}</h1>
	</header>

	<slot />
</aside>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		background-color: colors.$gray-c;
		display: flex;
		flex-direction: column;
		width: calc(100vw - sizes.$nav-width);
		border-left: 1px solid colors.$border;
		border-top: 1px solid colors.$border;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		align-items: center;
		height: sizes.$nav-width;
		margin: 0;
		padding-left: 15px;
		padding-right: 15px;

		h1 {
			text-transform: uppercase;
			font-size: inherit;
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			min-width: calc(sizes.$screen-sm - sizes.$nav-width);
			max-width: calc(sizes.$screen-sm - sizes.$nav-width);
		}
	}
</style>
