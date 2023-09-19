// Parses the database method of storing colors into CSS HSL colors

const BRIGHT_LIGHT = 0.80
const BRIGHT_DARK = 0.80

const MAIN_LIGHT = 0.50
const MAIN_DARK = 0.30

const DIM_LIGHT = 0.30
const DIM_DARK = 0.20

const SAT_LIMIT = 0.45
const BORDER_OPACITY_LIGHT = 0.30
const BORDER_OPACITY_DARK = 0.20


export function randomPalette(): Palette {
	function randColor(): number[] {
		return [
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256)
		]
	}
	return buildPalette(buildMgColor(randColor(), randColor()));
}

export function buildPalette(mgColor: string): Palette {

	const parsed = parseMgColor(mgColor)

	const l = parsed[0]
	const d = parsed[1]

	const lb = [l[0], Math.min(l[1], SAT_LIMIT), BRIGHT_LIGHT] 
	const db = [d[0], Math.min(d[1], SAT_LIMIT), BRIGHT_DARK]

	const lm = [l[0], Math.min(l[1], SAT_LIMIT), MAIN_LIGHT] 
	const dm = [d[0], Math.min(d[1], SAT_LIMIT), MAIN_DARK]


	const ld = [l[0], Math.min(l[1], SAT_LIMIT), DIM_LIGHT] 
	const dd = [d[0], Math.min(d[1], SAT_LIMIT), DIM_DARK] 

	const pal = {
		bright: {
			light: buildCssColor(lb),
			dark: buildCssColor(db)
		},
		main: {
			light: buildCssColor(lm),
			dark: buildCssColor(dm)
		},
		dark: {
			light: buildCssColor(ld),
			dark: buildCssColor(dd)
		}, 
		border: {
			light: buildCssColor(lb, BORDER_OPACITY_LIGHT),
			dark: buildCssColor(db, BORDER_OPACITY_DARK)
		}
	}
	return pal;
}

// Returns two arrays of numbers, containing HSL colors
function parseMgColor(mgColor: string): [number[], number[]] {

	let colors = mgColor.split("&")
	let light = RGBtoHSV(colors[0].split(".").map((val) => parseInt(val)))
	let dark = RGBtoHSV(colors[1].split(".").map((val) => parseInt(val)))

	return [light, dark]
}

function buildMgColor(light: number[], dark: number[]): string {
	return light[0] + "." + light[1] + "." + light[2] + "&" + dark[0] + "." + dark[1] + "." + dark[2]
}

function buildCssColor(color: number[], opacity: number = 1): string {
	color = HSVtoRGB(color)
	return "rgba("+color[0]+", "+color[1]+", "+color[2]+", "+opacity+")"; 
}

function RGBtoHSV(rgb: number[]): number[] {
	// Convert RGB to the range of 0-1
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	// Find the max and min values
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	// Calculate the value and saturation
	const v = max;
	const s = max === 0 ? 0 : (max - min) / max;

	// Calculate the hue
	let h: number = 0;
	if (max === min) {
		h = 0;
} else {
		switch (max) {
			case r:
				h = ((g - b) / (max - min)) + (g < b ? 6 : 0);
			break;
			case g:
				h = ((b - r) / (max - min)) + 2;
			break;
			case b:
				h = ((r - g) / (max - min)) + 4;
			break;
		}
		h *= 60;
	}

	// Return the HSV color value as an array
	return [Math.round(h), Math.round(s * 100)/100, Math.round(v * 100)/100];
}

function HSVtoRGB(hsv: number[]): number[] {

	const [h, s, v] = hsv;

	let [r, g, b] = [0, 0, 0];

	const M = 255 * v;
	const m = M * (1 - s);
	const z = (M - m) * (1 - Math.abs(((h / 60) % 2) - 1));

	if (h >= 0 && h < 60) {
		r = M
		g = z + m
		b = m
	} else if (h >= 60 && h < 120) {
		r = z + m
		g = M
		b = m
	} else if (h >= 120 && h < 180) {
		r = m
		g = M
		b = z + m
	} else if (h >= 180 && h < 240) {
		r = m
		g = z + m
		b = M
	} else if (h >= 240 && h < 300) {
		r = z + m
		g = m
		b = M
	} else if (h >= 300 && h < 360) {
		r = M
		g = m
		b = z + m
	}

	return [r, g, b]
}






