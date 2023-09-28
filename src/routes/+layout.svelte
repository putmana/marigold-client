<script lang="ts">
	import "../style/global.scss"
</script>

<slot />

<style lang="scss">
	@use "/src/style/colors";
	:global(body) {
		background-color: colors.$gray-a;
		margin: 0;
	}
</style>
