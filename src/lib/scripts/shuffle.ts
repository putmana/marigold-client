// <---- SHUFFLE TRACKS ----> 
// shuffles an array of tracks, putting the currently playing track at the beginning
export function shuffleTracks(tracks: Track[], current: number = 0): Track[] {
    let shuffled: Track[] = []
    shuffled.push(tracks[current])
    tracks = tracks.filter((track, index) => index != current)

    for (let i = tracks.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const temp = tracks[i]
        tracks[i] = tracks[r]
        tracks[r] = temp
    }

    shuffled = shuffled.concat(tracks);
    console.log(shuffled);

    return shuffled;
}