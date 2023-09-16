declare global {

	namespace App {
		// stuff goes here maybe
	}

	export type Color = {
		light: string
		dark: string
	}

	export type User = {
		id: string
		username: string
		email: string
	}


	export type Playlist = {
		id: string
		title: string
		description: string
		duration: number
		cover: string
		color: Color
		tracks: Track[]
	}

	export type Album = {
		id: string
		title: string
		artist: {
			id: string
			name: string
		}
		duration: number
		year: string
		cover: string
		color: Color
		tracks: Track[]
	}

	export type Track = {
		id: string
		title: string
		artist: {
			id: string
			name: string
		} 
		duration: number
		cover: string 
		color: Color
		file: string
	}
}
export {}
