<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { clamp } from "$lib/scripts/utils"

	export let duration: number
	export let currentTime: number
	export let palette: string
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

<div class="wrapper" class:contained style={`--scrub-position: ${progress}%; ${palette}`}>
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
	@use "src/style/colors";
	.wrapper {
		position: relative;
		display: flex;
		align-items: center;
		height: 5px;
		width: 100%;
		background-image: linear-gradient(to left, var(--primary-verydark), var(--secondary-verydark));

		.hitbox {
			position: absolute;
			display: flex;
			align-items: center;
			height: 20px;
			width: 100%;

			.track {
				display: flex;
				align-items: center;
				height: 5px;
				width: 100%;
				box-sizing: border-box;

				.progress {
					position: relative;
					display: flex;
					align-items: center;
					background-color: var(--primary-light);
					height: 5px;
					width: var(--scrub-position);

					.thumb {
						transition: 0.2s ease all;
						position: absolute;
						right: -2.5px;
						height: 5px;
						width: 5px;
						background-color: var(--primary-light);
						border-radius: 5px;
					}
				}
			}

			&:hover {
				cursor: pointer;

				.progress {
					.thumb {
						background-color: white;
						height: 10px;
						width: 10px;
						box-shadow: 0px 0px 5px colors.$shadow;
					}
				}
			}
		}
		&.contained {
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
