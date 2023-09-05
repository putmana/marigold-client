<script lang="ts">
	export let text: string = ""
	export let type: "PRIMARY" | "ERROR" = "PRIMARY"
</script>

<div class="void {type}">
	<div class="icon">
		<i class="bi bi-flower1"></i>
	</div>
	<span class="text">{text}</span>
</div>

<style lang="scss">
	@import "/static/vars.scss";
	.void {
		position: relative;
		display: flex;
		background-image: linear-gradient(to right, $gray-a, $gray-b);
		flex-direction: column;
		flex-grow: 1;
		max-height: calc(100vh - $player-size);
		border-left-style: solid;
		border-left-width: 1px;
		border-left-color: $gray-d;
		justify-content: center;
		align-items: center;
		.icon {
			font-size: $tab-size;
			opacity: 20%;
		}
		.text {
			opacity: 20%;
			font-weight: bold;
		}
	}
</style>
