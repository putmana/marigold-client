<script lang="ts">

</script>

<section class="wrapper">
	<slot />
</section>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		background-color: colors.$gray-b;		
		width: sizes.$nav-width;
	}

</style>
