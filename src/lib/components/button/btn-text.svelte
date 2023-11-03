<script lang="ts">
	export let label = "Button"
	export let smaller = false
</script>

<button class="btn" class:smaller on:click>
	{label}
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.button;
		&.smaller {
			padding: 8px;
			font-size: x-small;
		}
	}
</style>
