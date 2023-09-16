// Parses the database method of storing colors into CSS HSL colors

export function parseColor(colorString: string): Color {
	const splitColors = colorString.split("&")	

	const light = splitColors[0].split(".")
	const dark = splitColors[1].split(".")

	return {
		light: `rgb(${light[0]}, ${light[1]}, ${light[2]})`,
		dark: `rgb(${dark[0]}, ${dark[1]}, ${dark[2]})`,
	}
}
