<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { clamp } from "$lib/scripts/utils"
	import { playerPalette } from "$lib/stores/colors"

	export let active = false
	export let currentTime = 0
	export let duration = 0
	export let disabled = false

	const dispatch = createEventDispatcher()

	let width = 0
	let expanded = false
	let wrapper: HTMLDivElement

	$: if (!active) width = timeToPercent(currentTime, duration)
	$: if (disabled) width = 100

	function startScrub(e: MouseEvent) {
		if (!disabled) {
			active = true
			jumpScrub(e)
		}
	}

	async function scrub(e: MouseEvent) {
		if (active) {
			if (!expanded) expanded = true
			let mouseX = e.clientX
			let box = wrapper.getBoundingClientRect()
			width = parseWidth(box.left, box.width, mouseX)
		}
	}

	async function jumpScrub(e: MouseEvent) {
		let mouseX = e.clientX
		let box = wrapper.getBoundingClientRect()
		width = parseWidth(box.left, box.width, mouseX)
	}

	function endScrub() {
		if (active) {
			dispatch("timechange", {
				time: percentToTime(width, duration)
			})
			active = false
			expanded = false
		}
	}

	// takes the raw width of the window + the mouse position and returns the % width that the scrub bar should be
	let parseWidth = (left: number, width: number, mouseX: number): number => {
		let percent = ((mouseX - left) / width) * 100
		return clamp(percent, 0, 100)
	}

	let timeToPercent = (time: number, totalTime: number): number => {
		return (time / totalTime) * 100
	}

	let percentToTime = (percent: number, totalTime: number): number => {
		console.log(percent, totalTime)
		return totalTime * (percent / 100)
	}
</script>

<svelte:window on:mousemove={scrub} on:mouseup={endScrub} />

<div
	class="scrub-wrapper"
	bind:this={wrapper}
	class:expanded
	on:mousedown={startScrub}
	class:disabled
>
	<div class="scrub-track">
		{#if !disabled}
			<div
				class="scrub-progress"
				style="width: {width}%; --highlight-light: {$playerPalette.bright.light}"
			>
				<div class="scrub-thumb" />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "/static/vars.scss";
	.scrub-wrapper {
		width: 100%;
		position: relative;
		z-index: 3;
		.scrub-track {
			display: flex;
			align-items: center;
			background-color: $scrub-track-color;
			height: calc($margin-size - 1px);
			transition: height $hover-fade-time ease;
		}
		.scrub-progress {
			position: relative;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			background-color: var(--highlight-light);
			min-width: calc(2 * $margin-size);
			height: $margin-size;
			transition:
				background-color $hover-fade-time ease,
				height $hover-fade-time ease;
		}
		.scrub-thumb {
			position: relative;
			z-index: 20;
			left: calc(1 / 2 * $margin-size);
			background-color: $text-color;
			width: $margin-size;
			height: $margin-size;
			border-radius: $margin-size;
			transition:
				height $hover-fade-time ease,
				width $hover-fade-time ease,
				left $hover-fade-time ease;
		}

		&:hover {
			.scrub-progress {
				background-color: var(--highlight-light);
			}
			.scrub-thumb {
				position: relative;
				left: calc($margin-size);
				width: calc(2 * $margin-size);
				height: calc(2 * $margin-size);
			}
		}
		&.expanded {
			.scrub-progress {
				background-color: var(--highlight-light);
			}
			.scrub-thumb {
				width: calc(2 * $margin-size);
				height: calc(2 * $margin-size);
			}
		}
		&.disabled {
			opacity: 50%;
		}
	}
</style>
