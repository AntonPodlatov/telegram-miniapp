// src/types/global.d.ts
declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                ready: () => void
                expand: () => void
                close: () => void
                sendData: (data: string) => void
                showAlert: (message: string) => void
                showPopup: (params: any) => Promise<void>
                setBackgroundColor: (color: string) => void
                setHeaderColor: (color: string) => void
                backgroundColor: string
                themeParams: {
                    bg_color: string
                    text_color: string
                    hint_color: string
                    link_color: string
                    button_color: string
                    button_text_color: string
                    secondary_bg_color: string
                }
                initDataUnsafe?: {
                    user?: {
                        id: number
                        first_name: string
                        last_name?: string
                        username?: string
                        language_code?: string
                        photo_url?: string
                    }
                    query_id?: string
                    auth_date?: string
                    hash?: string
                }
                version: string
                platform: string
            }
        }
    }
}

export {} // Это важно для модуля