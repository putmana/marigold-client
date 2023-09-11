<script lang="ts">
	
</script>

<section class="wrapper">
	<slot />
</section>

<style lang="scss">
	@use '/src/style/colors';
	@use '/src/style/mixins';

	.wrapper {
		background-color: colors.$gray-c;
		border: 1px solid colors.$border;
		display: flex;
		flex-grow: 1;
	}
</style>
