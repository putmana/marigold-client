import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config";

export function validateToken(token: string) {
    return (token === UNAUTHORIZED_TOKEN) ? false : true
}