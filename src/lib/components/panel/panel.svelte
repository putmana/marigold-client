<script lang="ts">
</script>

<div class="panel">
	<slot />
</div>

<style lang="scss">
	@import "/static/vars.scss";
	.panel {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: $gray-c;
		min-width: $panel-size;
		transition: width $hover-fade-time ease;
		border-top: 1px solid $border-color;
		&::after {
			content: "";
			flex-grow: 1;
			border: 1px solid $border-color;
			border-top: none;
			border-bottom: none;
		}
	}
</style>
