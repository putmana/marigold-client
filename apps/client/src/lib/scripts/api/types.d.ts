export interface APIRequest<T> {
        id: string,
        form: T,
        file?: file
}

export interface APIResult<T = void> {
        success: boolean
        data?: T
        error?: string
}
