export enum registerIssue {
    generic = "generic",
    username = "name",
    email = "email",
    password = "password",
    confirmPassword = "confirm_password"
}

const VALID_EMAIL = {
    NO_WHITESPACE: /(?!.*\s)/,
    EMAIL_CHARS: /@.*\./
}

const VALID_USERNAME = {
    ALLOWED_CHARS: /^[a-zA-Z0-9_]+$/
}

const VALID_PASSWORD = {
    DIGIT: /(?=.*\d)/,
    LOWER_CASE: /(?=.*[a-z])/,
    UPPER_CASE: /(?=.*[A-Z])/,
    SPECIAL: /(?=.*[^a-zA-Z0-9])/,
    NO_WHITESPACE: /^\S+$/,
}


function checkEmail(email: string): Issue[] {
    let issues: Issue[] = [];

    if (!VALID_EMAIL.NO_WHITESPACE.test(email) || !VALID_EMAIL.EMAIL_CHARS.test(email)) issues.push({
        category: registerIssue.email,
        message: "Invalid email address"
    })

    return issues;
}

function checkUsername(username: string): Issue[] {
    let issues: Issue[] = [];
    if (username.length < 4) issues.push({
        category: registerIssue.username,
        message: "Username must contain at least 4 characters"
    })
    if (username.length > 32) issues.push({
        category: registerIssue.username,
        message: "Maximum username length is 32 characters"
    })
    if (!VALID_USERNAME.ALLOWED_CHARS.test(username)) issues.push({
        category: registerIssue.username,
        message: "Username may only contain alphanumeric characters and _"
    })

    return issues;
}

function checkPassword(password: string): Issue[] {
    let issues: Issue[] = [];

    if (password.length < 8) issues.push({
        category: registerIssue.password,
        message: "- At least 8 characters"
    })
    if (password.length > 200) issues.push({
        category: registerIssue.password,
        message: "- No more than 200 characters"
    })
    if (!VALID_PASSWORD.UPPER_CASE.test(password)) issues.push({
        category: registerIssue.password,
        message: "- At least one uppercase letter"
    })
    if (!VALID_PASSWORD.LOWER_CASE.test(password)) issues.push({
        category: registerIssue.password,
        message: "- At least one lowercase letter"
    })
    if (!VALID_PASSWORD.DIGIT.test(password)) issues.push({
        category: registerIssue.password, 
        message: "- At least one number"
    })
    if (!VALID_PASSWORD.SPECIAL.test(password)) issues.push({
        category: registerIssue.password,
        message: "- At least one special character"
    })
    if (!VALID_PASSWORD.NO_WHITESPACE.test(password)) issues.push({
        category: registerIssue.password,
        message: "- No whitespace"
    })
    

    return issues;
}

function checkPasswordsMatch(password: string, confirmPassword: string): Issue[] {
    let issues: Issue[] = []

    if (password !== confirmPassword) issues.push({
        category: registerIssue.confirmPassword,
        message: "Passwords do not match"
    })

    return issues;
}


export function auditRegister(username: string, email: string, password: string, confirmPassword: string): Issue[] {
    return [
        ...checkUsername(username),
        ...checkEmail(email),
        ...checkPassword(password),
        ...checkPasswordsMatch(password, confirmPassword)
    ]
}