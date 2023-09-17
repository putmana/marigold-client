import { pb } from '$lib/scripts/database/pocketbase'
export async function loginUser() {
	await pb.collection('users').authWithPassword(
		'adam@ptmn.io',
		'password'
	)
}
