import { pb } from "$lib/scripts/database/pocketbase";
import { library, selectedAlbumID, selectedArtistID, selectedPlaylistID, selectedTrackID } from "$lib/scripts/stores/LibraryStore";
import { mode } from "$lib/scripts/stores/ModeStore";
import { playerController } from "$lib/scripts/stores/PlayerStore";

export function logoutUser() {
        library.clear()
}
