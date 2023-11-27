import { get } from "svelte/store";

import { AudioAPI } from "$lib/scripts/api/AudioAPI";
import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI";

import { user } from "$lib/scripts/stores/UserStore";

export async function submit(form: TrackForm, file: File) {
        // Upload the track file to the database
        const res1 = await AudioAPI.upload(file, form.id, get(user).id)
        if (!res1.success) return res1

        // Create a database row for the track
        const res2 = await TrackAPI.create(form)
        if (!res2.success) return res2
}
