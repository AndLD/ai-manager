import { ID } from '../types'

export interface IMessage {
    _id?: ID
    text: string
    side: 'user' | 'ai'
    createdAt: number
    userId: string
}
