<script lang="ts">
	import "../style/global.scss"
</script>

<slot />

<style lang="scss">
	@use "/src/style/colors";
	:global(html) {
		overscroll-behavior: none;
	}

	:global(body) {
		background-color: colors.$gray-a;
		margin: 0;
		position: fixed;
		inset: 0 0 0 0;
	}
</style>
