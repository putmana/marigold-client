export function formatPlayerTime(time: number) {
        time = Math.round(time)

        const lzero = (x: number) => {
                return x < 10 ? `0${x}` : `${x}`
        }

        const secs = time % 60
        const mins = Math.floor(time / 60)
        const hours = Math.floor(mins / 60)

        if (hours > 0) {
                return `${hours}:${lzero(mins)}:${lzero(secs)}`
        }

        return `${mins}:${lzero(secs)}`
}

export function formatArtists(artists: Artist[]) {
        return artists.map(artist => artist?.name ?? "").join(", ")
}

export function clamp(x: number, min: number, max: number) {
        return Math.min(Math.max(min, x), max)
}

export function randomInteger(min: number, max: number) {
        const range = (max - min)
        const rnd = Math.floor(Math.random() * range) - min

        return rnd
}
