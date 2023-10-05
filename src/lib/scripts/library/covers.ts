import type { RecordModel } from "pocketbase"
import { getThumbURL, pb } from "$lib/scripts/database/pocketbase"
import { buildPalette } from "$lib/scripts/color-engine/color-engine"

// Sizes of cover art thumbnails
const THUMB_SIZE_LARGE = 500
const THUMB_SIZE_SMALL = 100

type CoverMap = Map<string, Cover>

export async function loadCovers(): Promise<CoverMap> {
        const coverRecords = await fetchCovers()
        const fileToken = await pb.files.getToken()
        return parseCovers(coverRecords, fileToken)
}

async function fetchCovers(): Promise<RecordModel[]> {
        const FIELDS = [
                "id",
                "color",
                "file",
        ]

        const records = await pb.collection('covers').getFullList({
                fields: FIELDS.toString(),
        })

        return records
}

function parseCovers(records: RecordModel[], fileToken: string): CoverMap {
        return new Map<string, Cover>(
                records.map((coverRecord: RecordModel) => {
                        const fileLarge = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_LARGE)
                        const fileSmall = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_SMALL)

                        return [
                                coverRecord.id,
                                {
                                        id: coverRecord.id,
                                        palette: buildPalette(coverRecord.color),
                                        fileLarge: fileLarge,
                                        fileSmall: fileSmall,
                                }
                        ]

                })
        )
}
