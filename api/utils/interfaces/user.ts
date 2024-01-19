import { ObjectId } from 'mongodb'

export type Subscription = 'free' | 'monthly' | 'yearly'

export type UserRole = 'manager' | 'ceo' | 'engineer' | 'qa'
export interface IUser {
    _id: ObjectId
    name: string
    email: string
    password: string
    status: UserStatus
    active: boolean
    subscription: Subscription
    createdAt: number
    updatedAt?: number
    keywords: string[]
    user: string

    company: string
    role: UserRole
}

export interface IUserState {
    _id: string
    name: string
    email: string
    status: UserStatus
    active: boolean
    subscription: Subscription
    createdAt: number
    updatedAt?: number

    company: string
    role: UserRole
}

export interface IUserInfo {
    _id: string
    name: string
    email: string
    status: UserStatus
    active: boolean
    subscription: Subscription
    createdAt: number
    updatedAt?: number
    keywords?: string[]
    user?: string

    company: string
    role: UserRole
}

export interface IUserPost {
    name: string
    email: string
    password: string
    subscription: Subscription
    status: UserStatus
    active: boolean
    keywords: string[]
    createdAt: number

    company: string
    role: UserRole
}

export interface IUserPostBody {
    name: string
    email: string
    password: string

    company: string
    role: UserRole
}

export type UserStatus = 'admin' | 'owner' | 'user' | 'unlimited' | 'banned'

export interface IFetchAuthorizedUserResponse {
    result: IUserInfo | null
}

export interface IFetchUsersResponse {
    result: IUserInfo[]
}

export interface IUserPostResponse {
    result: string
}

export interface IUserPutBody {
    status: UserStatus
}

export interface IUserPutResponse {
    result: IUserInfo
}
