export interface APIForm<T> {
        data: T
        action: "INSERT" | "UPDATE" | "DELETE"
        userID: string
        file?: file
}

export interface APIResult<T> {
        result: T
        success: boolean
        error?: string
}
