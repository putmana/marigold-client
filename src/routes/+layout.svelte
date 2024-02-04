<script lang="ts">
	import "../style/global.scss"
</script>

<slot />

<style lang="scss">
	@use "/src/lib/ui/colors";
	:global(html) {
		overscroll-behavior: none;
	}

	:global(body) {
		background-color: colors.$background-d;
		margin: 0;
		position: fixed;
		inset: 0 0 0 0;
	}
</style>
