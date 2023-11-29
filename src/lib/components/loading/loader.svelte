<script lang="ts">
	export let label = ""
</script>

<div class="wrapper">
	<img class="logo" src="public/images/logo.svg" alt="Marigold logo" />
	<h1>{label}</h1>
</div>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/animations";

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;

		.logo {
			@include animations.throb;

			width: 40px;
			height: 40px;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			25% {
				transform: rotate(180deg);
			}
			50% {
				transform: rotate(90deg);
			}
			75% {
				transform: rotate(-90deg);
			}
		}

		h1 {
			font-size: 20px;
		}
	}
</style>
