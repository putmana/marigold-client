import { library } from "$lib/scripts/stores/LibraryStore";

export function logoutUser() {
        library.clear()
}
