<script lang="ts">
	import { tracks } from "$lib/scripts/stores/LibraryStore"

	export let currentTrackID: string = ""

	let _id: string = ""
	let _title: string = ""
	let _index: number = 1
	let _src: string = ""
	let _file: File | undefined

	$: resetFields(currentTrackID)

	function resetFields(trackID: string) {
		const _track = $tracks.get(trackID)

		_id = _track?.id ?? ""
		_src = _track?.file ?? ""
		_file = undefined
	}

	function handleTrackChange(e: CustomEvent) {
		_src = e.detail.url
		_file = e.detail.file
	}

	export async function save(): Promise<string> {
		const trackData = {}
	}
</script>
