import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"

type ArtistMap = Map<string, Artist>
type ArtistData = {
        name: string,
}

export async function loadArtists(): Promise<ArtistMap> {
        const artistRecords = await fetchArtists()
        return parseArtists(artistRecords)
}

async function fetchArtists(): Promise<RecordModel[]> {
        const EXPAND = [
                "albums_artists(artist)",
                "artists_tracks(artist)",

        ]
        const FIELDS = [
                "id",
                "name",
                "expand.albums_artists(artist).id",
                'expand.albums_artists(artist).priority',
                "expand.artists_tracks(artist).id",
                "expand.artists_tracks(artist).priority",
        ]

        const records = await pb.collection('artists').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString(),
        })

        return records
}

// Creates a new artist record, then returns the record ID
export async function createNewArtist(artistData: ArtistData): Promise<string> {
        const newArtist = await pb.collection('artists').create({
                "name": artistData.name,
                "user": pb.authStore.model.id,
        })

        return newArtist.id
}

// Updates the specified artist record, then returns the record ID
export async function updateArtist(artistID: string, artistData: ArtistData): Promise<string> {
        await pb.collection('artists').update(artistID, {
                "name": artistData.name,
        })

        return artistID
}

function parseArtists(records: RecordModel[]): ArtistMap {
        return new Map<string, Artist>(
                records.map((artistRecord: RecordModel) => {

                        // Only returns albums where the artist is the PRIMARY artist 
                        const albumIDs: string[] = artistRecord.expand["albums_artists(artist)"]
                                .filter((relationRecord: RecordModel) => relationRecord.priority === 1)
                                .map((relationRecord: RecordModel) => { return relationRecord.id })

                        // Only returns tracks where the artist is the PRIMARY artist
                        const trackIDs: string[] = artistRecord.expand["artists_tracks(artist)"]
                                .filter((relationRecord: RecordModel) => relationRecord.priority === 1)
                                .map((relationRecord: RecordModel) => { return relationRecord.id })

                        return [
                                artistRecord.id,
                                {
                                        id: artistRecord.id,
                                        name: artistRecord.name,
                                        albumIDs: albumIDs,
                                        trackIDs: trackIDs,
                                }
                        ]
                })
        )
}
