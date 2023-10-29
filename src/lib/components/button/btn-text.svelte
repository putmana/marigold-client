<script lang="ts">
	export let label = "Button"
</script>

<button class="btn" on:click>
	{label}
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.button;
	}
</style>
