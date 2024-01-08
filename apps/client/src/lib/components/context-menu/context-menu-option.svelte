<script lang="ts">
	export let label = "Cxt Opt"
</script>

<button class="btn" on:click>
	{label}
</button>

<style lang="scss">
	@use "src/style/mixins";

	.btn {
		@include mixins.clickable;
		height: 30px;
		border-radius: 5px;
		padding: 0px 10px;
		font-size: small;
	}
</style>
