<script lang="ts">
	import { fade, fly } from "svelte/transition"
</script>

<main class="wrapper" transition:fade={{ duration: 200 }}>
	<img class="logo" src="public/images/logo.png" alt="Marigold logo" />
	<h1>loading</h1>
</main>

<style lang="scss">
	@use "/src/style/colors";

	.wrapper {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		inset: 0px 0px 0px 0px;
		background-image: linear-gradient(to bottom, colors.$gray-b, colors.$gray-a);

		.logo {
			width: 70px;
			height: 70px;
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
			font-size: 30px;
			opacity: 70%;
		}
	}
</style>
