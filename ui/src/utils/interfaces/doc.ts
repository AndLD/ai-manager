import { ID } from '../types'
import { IPaginationBackend } from './common'

export type DocType = 'google-sheets' | 'google-docs' | 'web-page'
export type DocArguments = { [key: string]: string }

export interface IDoc {
    _id: ID
    title: string
    type: DocType
    arguments: DocArguments | null
    references: string[]
    createdAt: number
    updatedAt?: number
}

export interface IDocPostBody {
    title: string
    type: DocType
    references: string[]
}

export interface IDocPostResponse {
    result: IDoc
}

export interface IFetchDocsResponse {
    result: IDoc[]
    meta: {
        pagination: IPaginationBackend
    }
}
