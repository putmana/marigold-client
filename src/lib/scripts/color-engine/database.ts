import type { Colorset } from "./color-engine"

export function parseDatabaseColors(dbColors: string): Colorset {
        const colors = dbColors.split("&")
        const p = colors[0].split(".").map(x => parseInt(x))
        const s = colors[1].split(".").map(x => parseInt(x))

        let primary = { R: p[0], G: p[1], B: p[2] }
        let secondary = { R: s[0], G: s[1], B: s[2] }

        return {
                primary: primary,
                secondary: secondary,
        }
}

export function generateDatabaseColors(colors: Colorset): string {
        const p = colors.primary
        const s = colors.secondary
        return `${p.R}.${p.G}.${p.B}&${s.R}.${s.G}.${s.B}`
}
