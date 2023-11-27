<script lang="ts">
	export let label = ""
</script>

<div class="wrapper">
	<img class="logo" src="public/images/logo.png" alt="Marigold logo" />
	<h1>{label}</h1>
</div>

<style lang="scss">
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 200px;

		.logo {
			width: 40px;
			height: 40px;
			animation: spin 4s ease infinite;
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
			opacity: 70%;
		}
	}
</style>
