import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"

type ArtistMap = Map<string, Artist>

export async function loadArtists(): Promise<ArtistMap> {
        const artistRecords = await fetchArtists()
        return parseArtists(artistRecords)
}

async function fetchArtists(): Promise<RecordModel[]> {
        const FIELDS = [
                "id",
                "name",
                "albums",
        ]

        const records = await pb.collection('artists').getFullList({
                fields: FIELDS.toString(),
        })

        return records
}

function parseArtists(records: RecordModel[]): ArtistMap {
        return new Map<string, Artist>(
                records.map((artistRecord: RecordModel) => {
                        return [
                                artistRecord.id,
                                {
                                        id: artistRecord.id,
                                        name: artistRecord.name,
                                        albumIDs: artistRecord.albums
                                }
                        ]
                })
        )
}
