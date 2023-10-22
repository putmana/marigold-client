import { pb } from "$lib/scripts/database/pocketbase";

export async function loginUser(email: string, password: string) {
        await pb.collection('users').authWithPassword(email, password)
}
