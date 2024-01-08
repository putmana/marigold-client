<script lang="ts" context="module">
	import ConfirmationModal from "./confirmation-modal.svelte"

	export function confirm(title: string, message: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			openModal<ConfirmationModal>({
				component: ConfirmationModal,
				props: {
					message: message,
					approve: () => resolve(true),
					deny: () => resolve(false)
				},
				title: title
			})
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy } from "svelte"

	import BtnText from "../button/btn-text.svelte"

	import { openModal } from "../modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let message: string

	export let approve = () => {}
	export let deny = () => {}

	function approveAndClose() {
		approve()
		close()
	}

	function close() {
		dispatch("close")
	}

	onDestroy(() => {
		deny()
	})
</script>

<div class="content">
	<div class="text">
		{message}
	</div>
	<div class="footer">
		<BtnText label="No" on:click={close} />
		<BtnText label="Yes" on:click={approveAndClose} />
	</div>
</div>

<style lang="scss">
	@use "src/style/colors";

	.content {
		display: flex;
		flex-direction: column;
		gap: 20px;

		width: min(90svw, 350px);

		.text {
			min-height: 40px;

			color: colors.$white-b;
			letter-spacing: 0.25px;
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			gap: 10px;
		}
	}
</style>
