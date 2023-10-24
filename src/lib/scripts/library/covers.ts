import type { RecordModel } from "pocketbase"
import { getThumbURL, pb } from "$lib/scripts/database/pocketbase"
import { type Colorset, buildPalette } from "$lib/scripts/color-engine/color-engine"
import { generateDatabaseColors, parseDatabaseColors } from "../color-engine/database"

// Sizes of cover art thumbnails
const THUMB_SIZE_LARGE = 500
const THUMB_SIZE_SMALL = 100

type CoverMap = Map<string, Cover>
type CoverData = {
        color: Colorset
}

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

export async function createCover(coverData: CoverData, file: File) {

        // Create a FormData object and append the necessary fields
        const formData = new FormData()
        formData.append('file', file)
        formData.append('color', generateDatabaseColors(coverData.color))

        // Create the cover object
        await pb.collection('covers').create(formData)

}

function parseCovers(records: RecordModel[], fileToken: string): CoverMap {
        return new Map<string, Cover>(
                records.map((coverRecord: RecordModel) => {
                        const fileLarge = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_LARGE)
                        const fileSmall = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_SMALL)

                        const colors = parseDatabaseColors(coverRecord.color)
                        const palette = buildPalette(colors)

                        return [
                                coverRecord.id,
                                {
                                        id: coverRecord.id,
                                        palette: palette,
                                        fileLarge: fileLarge,
                                        fileSmall: fileSmall,
                                }
                        ]

                })
        )
}
