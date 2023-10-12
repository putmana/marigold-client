export function sortIndexedTracks(tracks: IndexedTrack[]): IndexedTrack[] {
        function compare(a: IndexedTrack, b: IndexedTrack) {
                return a.index - b.index
        }

        return tracks.sort(compare)
}

export function shuffleArray(arr: Array<any>) {
        for (let i = arr.length - 1; i > 0; i--) {
                const k = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[k]] = [arr[k], arr[i]];
        }
        return arr;
}
