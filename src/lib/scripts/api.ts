/*

import { API_VERSION, BASE_API_URL, UNAUTHORIZED_TOKEN } from "$lib/config/mg.config";

const LOGIN_URL = BASE_API_URL + API_VERSION + "/login"
const USER_URL = BASE_API_URL + API_VERSION + "/user"
const VALIDATE_URL = BASE_API_URL + API_VERSION + "/validate"

export async function loginUser(email: string, password: string): Promise<Token> {
    console.log(email, password)
    let token: Token = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })

    }).then((response) => {
        return response.json() 
    }).then((response) => {
        console.log("RESPONSE", response)
        if (response.message === "SUCCESS") {
            return {
                valid: true,
                message: response.message,
                token: response.token
            } as Token
        } else if (response.message === "BAD CREDENTIALS") {
            return {
                valid: false,
                message: response.message,
                token: UNAUTHORIZED_TOKEN
            } as Token
        } else {
            return {
                valid: false,
                message: response.message,
                token: UNAUTHORIZED_TOKEN
            }
        }
    }).catch((error) => {
        return {
            valid: false,
            message: error,
            token: UNAUTHORIZED_TOKEN
        }
    })

    console.log("TOKEN", token)
    return token
}

export async function getAllPlaylists(token: string) {

}
*/