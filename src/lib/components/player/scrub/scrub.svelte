<script lang="ts">
	import type { Palette } from "$lib/scripts/color-engine/palette"

	import { createEventDispatcher } from "svelte"
	import { clamp } from "$lib/scripts/utils"

	export let duration: number
	export let currentTime: number
	export let palette: Palette
	export let contained = false
	export let progress = 0
	export let scrubPercent = 0

	const dispatch = createEventDispatcher()

	let hitbox: HTMLDivElement
	let scrubbing = false

	$: if (scrubbing) {
		progress = scrubPercent
	} else {
		progress = (currentTime / duration) * 100
	}

	$: scrubTime = duration * (scrubPercent / 100)

	function handleTouchStart(e: TouchEvent) {
		startScrub(e.touches[0].pageX)
		if (e.cancelable) e.preventDefault()
	}

	function handleTouchMove(e: TouchEvent) {
		updateScrub(e.touches[0].pageX)
	}

	function handleTouchEnd(e: TouchEvent) {
		endScrub()
		e.preventDefault()
	}

	function handleMouseDown(e: MouseEvent) {
		startScrub(e.clientX)
		e.preventDefault()
	}

	function handleMouseMove(e: MouseEvent) {
		updateScrub(e.clientX)
		e.preventDefault()
	}

	function handleMouseUp(e: MouseEvent) {
		endScrub()
		e.preventDefault()
	}

	function startScrub(xPos: number) {
		scrubbing = true
		updateScrub(xPos)
	}

	function updateScrub(xPos: number) {
		if (scrubbing) {
			const box = hitbox.getBoundingClientRect()
			const percent = ((xPos - box.left) / box.width) * 100
			scrubPercent = clamp(percent, 0, 100)
		}
	}

	function endScrub() {
		if (scrubbing) {
			dispatch("scrub", {
				time: scrubTime
			})
		}

		scrubbing = false
	}
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
	on:touchmove={handleTouchMove}
/>

<div class="wrapper" class:contained style={`--scrub-position: ${progress}%; ${palette.toCSS()}`}>
	<div
		class="hitbox"
		bind:this={hitbox}
		on:mousedown={handleMouseDown}
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchEnd}
	>
		<div class="track">
			<div class="progress">
				<div class="thumb" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	$track_height: 1px;
	$progress_height: 0.125rem;
	$progress_height_hover: 0.25rem;
	$hitbox_height: 1rem;

	.wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: $track_height;
		width: 100%;
		background-color: colors.$border;

		.hitbox {
			position: absolute;
			display: flex;
			align-items: center;
			height: $hitbox_height;
			width: 100%;

			.track {
				display: flex;
				align-items: center;
				height: 1px;
				width: 100%;
				box-sizing: border-box;

				.progress {
					transition: 0.2s ease height;
					position: relative;
					display: flex;
					align-items: center;
					background-color: var(--primary-light);
					height: $progress_height;
					width: var(--scrub-position);
					border-top-right-radius: 0.25rem;
					border-bottom-right-radius: 0.25rem;

					.thumb {
						transition: 0.2s ease all;
						position: absolute;
						right: 0rem;
						height: $progress_height;
						width: $progress_height;
						background-color: var(--primary-light);
						border-radius: 50%;
					}
				}
			}

			&:hover {
				cursor: pointer;

				.progress {
					height: $progress_height_hover;

					.thumb {
						background-color: white;
						height: calc(2 * $progress_height_hover);
						width: calc(2 * $progress_height_hover);
						box-shadow: vars.$item_shadow;
					}
				}
			}
		}
		&.contained {
			border-radius: vars.$item_border_radius;
			.hitbox {
				.track {
					border-radius: 5px;

					.progress {
						border-top-left-radius: 5px;
						border-bottom-left-radius: 5px;
					}
				}
			}
		}
	}
</style>
