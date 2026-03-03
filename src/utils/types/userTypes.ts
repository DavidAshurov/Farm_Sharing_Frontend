export interface User {
    nickname: string,
    phoneNumber: string,
    city: string,
    address: string,
    email: string,
    role: string,
    rating: number,
    avatar: string,
}

export interface NewUserDto {
    role: string,
    nickname: string,
    email: string,
    password: string,
    phoneNumber: string,
}

export interface UpdateUserDto {
    nickname?: string,
    phoneNumber?: string,
    email?: string,
    city?: string,
    address?: string,
    avatarTmpKey?: string,
}

export interface Credentials {
    email: string,
    password: string,
}

export interface AuthState {
    accessToken: string | null,
    user: User | null,
}