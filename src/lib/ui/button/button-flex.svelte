<script lang="ts">
	export let seamless = false
	export let grow = false
</script>

<button class:grow class:seamless {...$$restProps} on:click>
	<slot />
</button>

<style lang="scss">
	@use "./button";
	@use "../colors";

	button {
		@include button.base;

		&.grow {
			width: 100%;
		}

		&.seamless {
			@include button.seamless;
		}
	}
</style>
