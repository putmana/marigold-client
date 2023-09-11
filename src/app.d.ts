declare global {

	namespace App {
		// stuff goes here maybe
		type Palette = {
			light: {
				h: number
				s: number
				l: number
			}
			dark: {
				h: number
				s: number
				l: number
			}
		}
		type Track = {
			id: string
			title: string
			duration: string
			artists: string[]
			cover: {
				path: string
			}
		}
	}
}
