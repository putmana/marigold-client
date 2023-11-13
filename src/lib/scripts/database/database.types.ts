export type Json =
        | string
        | number
        | boolean
        | null
        | { [key: string]: Json | undefined }
        | Json[]

export interface Database {
        public: {
                Tables: {
                        albums: {
                                Row: {
                                        artists: string
                                        created_at: string
                                        id: string
                                        palette: string
                                        title: string
                                        user_id: string
                                        year: string
                                }
                                Insert: {
                                        artists?: string
                                        created_at?: string
                                        id?: string
                                        palette?: string
                                        title?: string
                                        user_id?: string
                                        year?: string
                                }
                                Update: {
                                        artists?: string
                                        created_at?: string
                                        id?: string
                                        palette?: string
                                        title?: string
                                        user_id?: string
                                        year?: string
                                }
                                Relationships: [
                                        {
                                                foreignKeyName: "albums_user_id_fkey"
                                                columns: ["user_id"]
                                                isOneToOne: false
                                                referencedRelation: "users"
                                                referencedColumns: ["id"]
                                        }
                                ]
                        }
                        tracks: {
                                Row: {
                                        album_id: string
                                        artists: string
                                        created_at: string
                                        duration: number
                                        id: string
                                        index: number
                                        title: string
                                        user_id: string
                                }
                                Insert: {
                                        album_id: string
                                        artists?: string
                                        created_at?: string
                                        duration?: number
                                        id?: string
                                        index?: number
                                        title?: string
                                        user_id?: string
                                }
                                Update: {
                                        album_id?: string
                                        artists?: string
                                        created_at?: string
                                        duration?: number
                                        id?: string
                                        index?: number
                                        title?: string
                                        user_id?: string
                                }
                                Relationships: [
                                        {
                                                foreignKeyName: "tracks_album_id_fkey"
                                                columns: ["album_id"]
                                                isOneToOne: false
                                                referencedRelation: "albums"
                                                referencedColumns: ["id"]
                                        },
                                        {
                                                foreignKeyName: "tracks_user_id_fkey"
                                                columns: ["user_id"]
                                                isOneToOne: false
                                                referencedRelation: "users"
                                                referencedColumns: ["id"]
                                        }
                                ]
                        }
                }
                Views: {
                        [_ in never]: never
                }
                Functions: {
                        [_ in never]: never
                }
                Enums: {
                        [_ in never]: never
                }
                CompositeTypes: {
                        [_ in never]: never
                }
        }
}
