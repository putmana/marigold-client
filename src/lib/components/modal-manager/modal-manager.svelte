<script lang="ts" context="module">
	import { get, writable, type Writable } from "svelte/store"

	import type { ComponentProps, ComponentType, SvelteComponent } from "svelte"

	type ModalData<T extends SvelteComponent> = {
		component: ComponentType<T>
		props: ComponentProps<T>
		title: string
		loading?: boolean
		progress?: number
	}

	export const modals: Writable<ModalData<SvelteComponent>[]> = writable([])

	export function openModal<T extends SvelteComponent>(modal: ModalData<T>) {
		modals.set([...get(modals), modal])
	}
</script>

<script lang="ts">
	import Modal from "./modal.svelte"

	function closeModal(index: number) {
		$modals = $modals.toSpliced(index, 1)
	}
</script>

{#each $modals as modal, index}
	<Modal
		title={modal.title}
		loading={modal.loading}
		progress={modal.progress}
		on:close={() => closeModal(index)}
	>
		<svelte:component
			this={modal.component}
			bind:loading={modal.loading}
			bind:progress={modal.progress}
			{...modal.props}
			on:close={() => {
				closeModal(index)
			}}
		/>
	</Modal>
{/each}
