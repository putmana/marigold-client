const BRIGHT_LIGHT = 60
const BRIGHT_DARK = 60

const MAIN_LIGHT = 35
const MAIN_DARK = 20

const DIM_LIGHT = 15
const DIM_DARK = 10

const SAT_LIGHT = 30
const SAT_DARK = 30


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

    const lb = [l[0], Math.min(l[1], SAT_LIGHT), BRIGHT_LIGHT]
    const db = [d[0], Math.min(d[1], SAT_DARK), BRIGHT_DARK]

    const lm = [l[0], Math.min(l[1], SAT_LIGHT), MAIN_LIGHT]
    const dm = [d[0], Math.min(d[1], SAT_DARK), MAIN_DARK]

    const ld = [l[0], Math.min(l[1], SAT_LIGHT), DIM_LIGHT]
    const dd = [d[0], Math.min(d[1], SAT_DARK), DIM_DARK]

    return {
        bright: {
            light: buildCssColor(lb),
            dark: buildCssColor(db)
        },
        main: {
            light: buildCssColor(lm),
            dark: buildCssColor(dm)
        },
        dim: {
            light: buildCssColor(ld),
            dark: buildCssColor(dd)
        } 
    }
}

// Returns two arrays of numbers, containing HSL colors
function parseMgColor(mgColor: string): [number[], number[]] {

    let colors = mgColor.split("&")
    let light = RGBtoHSL(colors[0].split(".").map((val) => parseInt(val)))
    let dark = RGBtoHSL(colors[1].split(".").map((val) => parseInt(val)))

    return [light, dark]
}

function buildMgColor(light: number[], dark: number[]): string {
    return light[0] + "." + light[1] + "." + light[2] + "&" + dark[0] + "." + dark[1] + "." + dark[2]
}

function buildCssColor(color: number[]): string {
    return "hsl("+color[0]+", "+color[1]+"%, "+color[2]+"%)"; 
}

function RGBtoHSL(rgb: number[]): number[] {
    // Convert RGB to the range of 0-1
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    // Find the max and min values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate the lightness and saturation
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

    // Calculate the hue
    let h = 0;
    if (max !== min) {
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

    // Return the HSL color value as an array
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}
  