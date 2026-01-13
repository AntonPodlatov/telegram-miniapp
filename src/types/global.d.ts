import type { WebApp } from '@twa-dev/types'

declare global {
    interface Window {
        Telegram?: {
            WebApp?: WebApp
        }
    }

    type Gender = 'male' | 'female' | 'other'
    type Purpose =  'relations' | 'dating' | 'friendship' | 'chat'

    interface Profile {
        name: string
        age: number
        gender: Gender
        showGender: Gender | 'all'
        purpose: Purpose
        photos: string[]
    }

    interface User {
        name: string
        birthday: string // YYYY-MM-DD
        age: number
        gender: Gender
        showGender: Gender | 'all'
        purpose: Purpose
        photo: string // base64
    }
}

export {}