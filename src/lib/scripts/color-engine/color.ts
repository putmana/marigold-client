import { clamp, randomInteger } from "../utils"
import type { LCH, RGB } from "./color-engine"
import { HEX_to_OKLCH, OKLCH_to_HEX, OKLCH_to_RGB, RGB_to_OKLCH } from "./oklab"
import type { Swatch } from "./swatch"

export class Color {
        LCH: LCH

        constructor(R: number, G: number, B: number) {
                this.LCH = RGB_to_OKLCH({ R, G, B })
        }

        get RGB(): RGB {
                return OKLCH_to_RGB(this.LCH)
        }

        set RGB(rgb: RGB) {
                this.LCH = RGB_to_OKLCH(rgb)
        }

        get HEX(): string {
                return OKLCH_to_HEX(this.LCH)
        }

        set HEX(hex: string) {
                this.LCH = HEX_to_OKLCH(hex)
        }

        // See swatch.ts for details on how swatches work
        toCSS(swatch: Swatch): string {
                const c = OKLCH_to_RGB({
                        L: clamp(this.LCH.L, swatch.lmin, swatch.lmax),
                        C: Math.min(this.LCH.C, swatch.chroma),
                        H: this.LCH.H,
                })

                return `--${swatch.name}: rgb(${c.R}, ${c.G}, ${c.B}, ${swatch.opacity});`
        }

        toCSSVariable(name: string, opacity: number = 1): string {
                const c = this.RGB

                return `--${name}: rgb(${c.R}, ${c.G}, ${c.B}, ${opacity});`
        }

        toString() {
                return `${this.RGB.R}.${this.RGB.G}.${this.RGB.B}`
        }

        static parseColorString(colorString: string): Color {
                try {
                        const c = colorString
                                .split(".")
                                .map(x => parseInt(x))

                        return new Color(c[0], c[1], c[2])

                } catch {
                        console.error(`Failed to parse color palette string: ${colorString}`)

                        return this.gray
                }
        }

        static fromRGB(c: RGB): Color {
                return new Color(c.R, c.G, c.B)
        }

        static random(): Color {
                const R = randomInteger(0, 255)
                const G = randomInteger(0, 255)
                const B = randomInteger(0, 255)

                return new Color(R, G, B)
        }

        static gray = new Color(0, 0, 0)
}
