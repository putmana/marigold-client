// Controls the individual shades of color for the color palette
// Note that the chroma field is the MAXIMUM chroma, not the set chroma.
// If a color has a lower chroma than the one set in the swatch, it will
// default to that chroma

export type Swatch = {
        lmin: number,
        lmax: number, // The lightness of the color in the oklch color model
        chroma: number, // The MAXIMUM chroma of the color in the oklch color model
        opacity: number, // The opacity of the color
        name: string, // The name of the CSS color variable
}

export const primarySwatches: Swatch[] = [
        { lmin: 0.80, lmax: 0.80, chroma: 0.06, opacity: 1.0, name: "primary-verylight", },
        { lmin: 0.60, lmax: 0.65, chroma: 0.06, opacity: 1.0, name: "primary-light", },
        { lmin: 0.50, lmax: 0.50, chroma: 0.06, opacity: 1.0, name: "primary-medium", },
        { lmin: 0.35, lmax: 0.50, chroma: 0.06, opacity: 1.0, name: "primary-dark", },
        { lmin: 0.15, lmax: 0.30, chroma: 0.06, opacity: 1.0, name: "primary-verydark", },
        { lmin: 0.50, lmax: 0.65, chroma: 0.06, opacity: 0.7, name: "primary-border", },
]

export const secondarySwatches: Swatch[] = [
        { lmin: 0.75, lmax: 0.75, chroma: 0.06, opacity: 1.0, name: "secondary-verylight", },
        { lmin: 0.55, lmax: 0.60, chroma: 0.06, opacity: 1.0, name: "secondary-light", },
        { lmin: 0.40, lmax: 0.40, chroma: 0.06, opacity: 1.0, name: "secondary-medium", },
        { lmin: 0.25, lmax: 0.35, chroma: 0.06, opacity: 1.0, name: "secondary-dark", },
        { lmin: 0.10, lmax: 0.25, chroma: 0.06, opacity: 1.0, name: "secondary-verydark", },
        { lmin: 0.50, lmax: 0.65, chroma: 0.06, opacity: 0.7, name: "secondary-border", },
]
