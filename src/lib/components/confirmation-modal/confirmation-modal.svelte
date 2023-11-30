<script lang="ts" context="module">
	interface ConfProps {
		title: string
		message: string
	}

	export async function confirm(props: ConfProps) {
		confVisible.set(true)
		confTitle.set(props.title)
		confMessage.set(props.message)

		return new Promise((resolve) => {
			onConfirm.set((approved: boolean) => {
				resolve(approved)
				confVisible.set(false)
			})
		})
	}
</script>

<script lang="ts">
	import BtnText from "../button/btn-text.svelte"
	import PopupBox from "../popup-box/popup-box.svelte"
	import { confMessage, confTitle, confVisible, onConfirm } from "./ConfStore"

	function approve() {
		$onConfirm(true)
	}

	function deny() {
		$onConfirm(false)
	}
</script>

<PopupBox title={$confTitle} bind:visible={$confVisible}>
	<div slot="content" class="content">
		<div class="text">
			{$confMessage}
		</div>
		<div class="footer">
			<BtnText label="Yes" on:click={approve} />
			<BtnText label="No" on:click={deny} />
		</div>
	</div>
</PopupBox>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 20px;

		width: min(90svw, 300px);

		.text {
			min-height: 50px;
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			gap: 10px;
		}
	}
</style>
