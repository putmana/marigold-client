import { Color } from "./color";
import type { RGB } from "./color-engine";
import { primarySwatches, secondarySwatches } from "./swatch";

export class Palette {
        primary: Color
        secondary: Color

        constructor(primary: Color, secondary: Color) {
                this.primary = primary
                this.secondary = secondary
        }

        toCSS() {
                let primaryCSS = primarySwatches.map(swatch => {
                        return this.primary.toCSS(swatch)
                })

                primaryCSS.push(this.primary.toCSSVariable("primary-initial"))

                let secondaryCSS = secondarySwatches.map(swatch => {
                        return this.secondary.toCSS(swatch)
                })

                secondaryCSS.push(this.secondary.toCSSVariable("secondary-initial"))


                return [primaryCSS.join(""), secondaryCSS.join("")].join("")
        }

        toString() {
                return `${this.primary.toString()}&${this.secondary.toString()}`
        }

        static fromRGB(primary: RGB, secondary: RGB) {
                return new Palette(Color.fromRGB(primary), Color.fromRGB(secondary))
        }

        static parsePaletteString(paletteString: string): Palette {
                try {
                        const colors: Color[] = paletteString
                                .split("&")
                                .map(c => Color.parseColorString(c))

                        return new Palette(colors[0], colors[1])
                } catch {
                        console.error(`Failed to parse color palette string: ${paletteString}`)

                        return this.gray
                }
        }

        static random(): Palette {
                const primary = Color.random()
                const secondary = Color.random()

                return new Palette(primary, secondary)
        }

        static gray = new Palette(Color.gray, Color.gray)
}
