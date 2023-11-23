<script lang="ts">
	export let label = "Button"
	export let smaller = false
	export let submit = false
	export let grow = false
</script>

<button class="btn" type={submit ? "submit" : "button"} class:smaller class:grow on:click>
	{label}
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.button;

		&.grow {
			width: 100%;
		}

		&.smaller {
			padding: 8px;
			font-size: x-small;
		}
	}
</style>
