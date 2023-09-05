<script lang="ts">
	export let message: string
	export let style: "info" | "warning" | "error" = "info"
</script>

<div class="wrapper {style}">
	<div class="icon">
		{#if style === "info"}
			<i class="bi bi-info-circle"></i>
		{:else if style === "warning"}
			<i class="bi bi-exclamation-triangle"></i>
		{:else if style === "error"}
			<i class="bi bi-x-octagon"></i>
		{/if}
	</div>
	<div class="text"></div>
	{message}
</div>

<style lang="scss">
	@import "/static/vars.scss";

	.wrapper {
		border: 1px solid $border-color;
		border-radius: $margin-size;
		width: 100%;
		min-height: $banner-size;
		display: flex;
		align-items: center;
		margin-top: $margin-size;
		padding: calc(2 * $margin-size);

		&.info {
			background-color: $infobox-color-info;
		}
		&.warning {
			background-color: $infobox-color-warning;
		}
		&.error {
			background-color: $infobox-color-error;
		}
	}
	.icon {
		margin-right: calc(2 * $margin-size);
	}
</style>
