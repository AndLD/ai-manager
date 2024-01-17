import { ID } from '../types'

export interface IMessage {
    _id: ID
    text: string
    timestamp: number // UTC timestamp
    side: 'user' | 'ai'
}
