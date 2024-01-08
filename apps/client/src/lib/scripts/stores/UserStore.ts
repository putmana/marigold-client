import { writable, type Writable } from "svelte/store";
import { sb } from "../database/supabase";
import type { AuthUser } from "@supabase/supabase-js";

export function createUserStore() {
        const { subscribe, set }: Writable<AuthUser | null> = writable(null)

        async function init() {
                const { data, error } = await sb.auth.getSession()
                if (error) console.error(error)
                if (data.session) set(data.session.user)

                sb.auth.onAuthStateChange((event, session) => {
                        console.log(event)
                        set(session?.user)
                })
        }

        async function login(email: string, password: string): Promise<string[]> {
                const { error } = await sb.auth.signInWithPassword({
                        email: email,
                        password: password,
                })

                return error ? [error.message] : []
        }

        async function register(username: string, email: string, password: string) {
                const { error } = await sb.auth.signUp({
                        email: email,
                        password: password,
                })

                if (error) console.error(error)
        }

        async function logout() {
                const { error } = await sb.auth.signOut()
                if (error) console.error(error)
                location.reload()
        }

        return {
                subscribe,
                init,
                login,
                register,
                logout,
        }
}

export const user = createUserStore()
