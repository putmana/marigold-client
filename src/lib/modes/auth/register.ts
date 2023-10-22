import { pb } from "$lib/scripts/database/pocketbase";
import type { ValidationIssue } from "./validate";

export type RegistrationIssues = {
        username: string[],
        email: string[],
        password: string[],
        confirm_password: string[],
        generic: string[],
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,24}$/
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,200}$/

const ISSUE_USERNAME_INVALID = "Username must be between 4-24 characters, and may only contain letters, numbers, and underscores"
const ISSUE_EMAIL_INVALID = "Invalid email address"
const ISSUE_PASSWORD_INVALID = "Passwords must be between 8-200 characters, and must contain one letter and one number"
const ISSUE_CONFIRM_PASSWORD_NOMATCH = "Passwords do not match"

export function validateRegistration(username: string, email: string, password: string, confirm_password: string): { valid: boolean, issues: RegistrationIssues } {
        let valid = true

        let issues: RegistrationIssues = {
                username: [],
                email: [],
                password: [],
                confirm_password: [],
                generic: [],
        }

        // Confirm username meets the minimum requirements
        if (!username.match(USERNAME_REGEX)) {
                issues.username.push(ISSUE_USERNAME_INVALID)
                valid = false
        }

        // Confirm email is a valid email address
        if (!email.match(EMAIL_REGEX)) {
                issues.email.push(ISSUE_EMAIL_INVALID)
                valid = false
        }

        // Confirm that passwords meets the minimum criteria
        if (!password.match(PASSWORD_REGEX)) {
                issues.password.push(ISSUE_PASSWORD_INVALID)
                valid = false
        }

        // Confirm that the passwords match
        if (password !== confirm_password) {
                issues.confirm_password.push(ISSUE_CONFIRM_PASSWORD_NOMATCH)
                valid = false
        }

        return { valid, issues }
}

export async function registerUser(username: string, email: string, password: string) {
        const data = {
                email: email,
                password: password,
                passwordConfirm: password,
                name: username,
        }

        await pb.collection('users').create(data)

}
