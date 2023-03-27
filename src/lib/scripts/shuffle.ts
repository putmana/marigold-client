// <---- SHUFFLE TRACKS ----> 
// shuffles an array of tracks, putting the currently playing track at the beginning
export function shuffleTracks(tracks: Track[], current: number = 0): {list: Track[], shuffleMap: Map<number, number>} {
    let shuffled: Track[] = []
    let shuffleMap: Map<number, number> = new Map()
    shuffleMap.set(0, current)
    shuffled.push(tracks[current])
    tracks = tracks.filter((track, index) => index != current)


    for (let i = tracks.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const temp = tracks[i]
        tracks[i] = tracks[r]
        
        tracks[r] = temp
        shuffleMap.set(i, r)
    }

    shuffled = shuffled.concat(tracks);
    console.log(shuffleMap[1])
    console.log(shuffleMap["1"])
    console.log(shuffled);

    return {
        list: shuffled,
        shuffleMap: shuffleMap
    }
}