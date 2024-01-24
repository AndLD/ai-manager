import { ID } from '../types'

export interface IMessage {
    _id: ID
    text: string
    side: 'user' | 'ai'
    createdAt: number
}

export interface IMessagePostBody {
    text: string
    createdAt: number
}

export interface IMessagePostResponse {
    result: {
        message: IMessage
        answer: IMessage
    }
}

export interface IFetchMessagesResponse {
    result: IMessage[]
}
