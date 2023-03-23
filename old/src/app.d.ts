// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type Playlist = {
		id: string;
		title: string;
		username: string;
		description: string;
		cover: {
			path: string;
			color: string;
		}
	}
}

export {};
