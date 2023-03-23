// <---- CLAMP ---->
// Clamps a number between a minimum and maximum value
export function clamp(num: number, min: number, max: number) {
    let clamped = ((num < min) ? min : (num > max) ? max : num)
    return clamped
}

// <---- FORMAT ARTISTS ---->
export function formatArtists(artists: Artist[]): string {
    let formatted = ""    
    artists.forEach((artist: Artist, index: number) => {
        if (index == artists.length - 1) {
            formatted += artist.name
        } else {
            formatted += artist.name + ", "
        }
    })

    return formatted;
}

// <---- FORMAT TIME ---->
export function formatTime(secs: number, long: boolean = false, displaySecs: boolean = true): string {
    let h = Math.floor(secs / 3600)
    let m = Math.floor(secs / 60)
    let s = Math.floor(secs % 60)
    let formatted = ""

    if (long) { // x hours x mins x secs
        if (h != 0) formatted += h.toString() + " hours " 
        if (m != 0) formatted += m.toString() + " mins "
        if (s != 0 && displaySecs) formatted += s.toString() + " secs"
    } else { // x:xx:xx
        if (h != 0) formatted += h.toString() + ":" // leaves off hours if hours = 0.
        formatted += ((m < 10 && h != 0) ? "0" + m.toString() : m.toString()) + ((displaySecs) ? ":" : "")
        if (displaySecs) formatted += ((s < 10) ? "0" + s.toString() : s.toString())
    
    }

    return formatted

}

