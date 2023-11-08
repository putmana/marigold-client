import type { RecordModel } from "pocketbase"
import { getThumbURL, pb } from "$lib/scripts/database/pocketbase"
import type { Palette } from "../color-engine/palette"

// Sizes of cover art thumbnails
const THUMB_SIZE_LARGE = 500
const THUMB_SIZE_SMALL = 100

type CoverMap = Map<string, Cover>

interface ICreateCovor {
        palette: Palette
        file: File
}

interface IUpdateCovor {
        id: string
        palette?: Palette
        file?: File
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

export async function createCover(coverData: ICreateCovor): Promise<string> {
        // Create a FormData object and append the necessary fields
        const formData = new FormData()

        formData.append('file', coverData.file)
        formData.append('user', pb.authStore.model.id)
        formData.append('color', coverData.palette.toString())

        // Create the cover object
        const record = await pb.collection('covers').create(formData)

        return record.id

}

export async function updateCover(coverData: IUpdateCovor): Promise<string> {
        const formData = new FormData()

        if (coverData.file) formData.append('file', coverData.file)
        if (coverData.palette) formData.append('color', coverData.palette.toString())

        const record = await pb.collection('covers').update(coverData.id, formData)

        return record.id
}

function parseCovers(records: RecordModel[], fileToken: string): CoverMap {
        return new Map<string, Cover>(
                records.map((coverRecord: RecordModel) => {
                        const fileLarge = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_LARGE)
                        const fileSmall = getThumbURL("covers", coverRecord.id, coverRecord.file, fileToken, THUMB_SIZE_SMALL)
                        const palette = coverRecord.color

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
