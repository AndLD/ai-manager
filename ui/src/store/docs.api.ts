import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '../utils/store'
import { IDocPostBody, IDocPostResponse, IFetchDocsResponse } from '../utils/interfaces/doc'

export const privateDocsApi = createApi({
    reducerPath: '/api/private/docs',
    baseQuery: baseQueryWithRefresh,
    endpoints: builder => ({
        postDoc: builder.mutation<IDocPostResponse, { body: IDocPostBody }>({
            query: ({ body }) => ({
                method: 'POST',
                url: `/api/private/docs`,
                body,
            }),
        }),
        fetchDocs: builder.query<
            IFetchDocsResponse,
            {
                pagination: { current: number; pageSize: number }
                filters?: string
                order?: string
            }
        >({
            query: ({ pagination, filters, order }) => ({
                url: '/api/private/docs',
                params: {
                    page: pagination.current,
                    results: pagination.pageSize,
                    filters,
                    order,
                },
            }),
        }),
    }),
})

export const { useFetchDocsQuery, usePostDocMutation } = privateDocsApi
