import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../utils/store'
import {
    IFetchMessagesResponse,
    IMessage,
    IMessagePostBody,
    IMessagePostResponse,
} from '../utils/interfaces/message'

export const privateMessagesApi = createApi({
    reducerPath: '/api/private/messages',
    baseQuery: baseQueryWithRefresh,
    endpoints: builder => ({
        postMessage: builder.mutation<IMessagePostResponse, { body: IMessagePostBody }>({
            query: ({ body }) => ({
                method: 'POST',
                url: '/api/private/messages',
                body,
            }),
        }),
        fetchMessages: builder.query<IMessage[], {}>({
            query: () => ({
                url: '/api/private/messages',
            }),
        }),
    }),
})

export const { useFetchMessagesQuery, usePostMessageMutation } = privateMessagesApi
