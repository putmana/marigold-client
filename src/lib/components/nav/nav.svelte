<script lang="ts">
</script>

<nav class="wrapper">
	<slot />
</nav>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		background-color: colors.$gray-b;
		width: sizes.$nav-width;
	}
</style>
