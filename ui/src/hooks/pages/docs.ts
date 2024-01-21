import { useState } from 'react'
import { IPagination } from '../../utils/interfaces/common'
import { IDoc } from '../../utils/interfaces/doc'
import { useFetchDocs } from '../store/docs.api'

export function useDocsContextValue() {
    const tableDataState = useState<IDoc[]>([])
    const paginationState = useState<IPagination>({
        current: 1,
        pageSize: 10,
    })
    const isTableLoadingState = useState<boolean>(false)
    const searchValueState = useState<string>()
    const typeFilterState = useState<any>()

    useFetchDocs(paginationState[0], data => {
        tableDataState[1](data.result)

        if (data.meta?.pagination) {
            paginationState[1]({
                pageSize: data.meta.pagination.results,
                current: data.meta.pagination.page,
                total: data.meta.pagination.total,
            })
        }
    })

    return {
        tableDataState,
        paginationState,
        isTableLoadingState,
        searchValueState,
        typeFilterState,
    }
}
