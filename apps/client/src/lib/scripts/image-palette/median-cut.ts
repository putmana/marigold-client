import { Color } from "../color-engine/color"
import { OKLCH_to_RGB, RGB_to_OKLCH } from "../color-engine/oklab"

type bucket = {
        range: number, // the range of the dimension with the highest range
        pixels: number[][]
}

export function quantize(buckets: bucket[]) {
        return buckets.reduce((carr, bucket) => {
                return [...carr, bucket.pixels[Math.floor(bucket.pixels.length / 2)]]
        }, [])
}

function splitBucket(bucket: bucket): bucket[] {
        const ranges = getRanges(bucket.pixels)
        const largestRangeIndex = ranges.indexOf(Math.max(...ranges))

        const sorted = bucket.pixels.sort((a, b) => {
                return a[largestRangeIndex] - b[largestRangeIndex]
        })


        const median = Math.floor((sorted.length + 1) / 2)

        const pixelsL = sorted.slice(0, median)
        const pixelsR = sorted.slice(median, sorted.length)

        const bucketL = {
                range: Math.max(...getRanges(pixelsL)),
                pixels: pixelsL,
        }

        const bucketR = {
                range: Math.max(...getRanges(pixelsR)),
                pixels: pixelsR,
        }

        return [bucketL, bucketR]
}

export function getQuantizedColors(pixels: number[][], iterations: number) {
        const initialBucket = {
                range: Math.max(...getRanges(pixels)),
                pixels: pixels,
        }

        let buckets = [initialBucket]

        for (let i = 0; i < iterations; i++) {
                const b = buckets.pop()
                buckets.push(...splitBucket(b))
                buckets.sort((a, b) => a.range - b.range)
        }

        const colors = quantize(buckets)

        return colors
}

function meanColor(pixels: number[][]) {
        const R = pixels.map(c => c[0]).reduce((a, b) => a + b, 0) / pixels.length
        const G = pixels.map(c => c[1]).reduce((a, b) => a + b, 0) / pixels.length
        const B = pixels.map(c => c[2]).reduce((a, b) => a + b, 0) / pixels.length

        return [R, G, B]
}

function medianColor(pixels: number[][]) {
        const colors = pixels
                .map(c => RGB_to_OKLCH({
                        R: c[0],
                        G: c[1],
                        B: c[2],
                }))
                .sort((a, b) => a.L - b.L)
                .sort((a, b) => a.H - b.H)

        const mc = OKLCH_to_RGB(colors[Math.floor(colors.length / 2)])

        return [mc.R, mc.G, mc.B]
}

function getRanges(pixels: number[][]) {
        const R = pixels.map(c => c[0])
        const G = pixels.map(c => c[1])
        const B = pixels.map(c => c[2])

        const ranges = [
                Math.max(...R) - Math.min(...R),
                Math.max(...G) - Math.min(...G),
                Math.max(...B) - Math.min(...B),
        ]

        return ranges
}
