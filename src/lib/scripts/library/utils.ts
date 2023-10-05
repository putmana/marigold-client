export function sortIndexedTracks(tracks: IndexedTrack[]): IndexedTrack[] {
        function compare(a: IndexedTrack, b: IndexedTrack) {
                return a.index - b.index
        }

        return tracks.sort(compare)
}
