<script lang="ts">
	export let size = 40
</script>

<img
	class="throbber"
	style={`--throbber-size: ${size}px`}
	src="public/images/logo.svg"
	alt="Throbber"
/>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/animations";

	.throbber {
		@include animations.throb;

		display: block;

		width: var(--throbber-size);
		height: var(--throbber-size);
	}
</style>
