import { IPagination } from '../../utils/interfaces/common'
import { useToken } from '../auth'
import { useContext, useEffect } from 'react'
import { docsContext } from '../../context'
import { errorNotification } from '../../utils/notifications'
import { IDocPostBody, IFetchDocsResponse } from '../../utils/interfaces/doc'
import { useFetchDocsQuery, usePostDocMutation } from '../../store/docs.api'

export function useFetchDocs(
    pagination: IPagination,
    callback: (result: IFetchDocsResponse) => void
) {
    const token = useToken()

    const fetchUsersQuery = useFetchDocsQuery({ pagination }, { skip: !token })

    useEffect(() => {
        if (fetchUsersQuery.data) {
            callback(fetchUsersQuery.data)
        }
    }, [fetchUsersQuery.data])
}

export function usePostDoc() {
    const [tableData, setTableData] = useContext(docsContext).tableDataState

    const [putUserMutation] = usePostDocMutation()

    return (body: IDocPostBody) =>
        putUserMutation({
            body,
        }).then((value: any) => {
            if (value.data) {
                const doc = value.data.result

                if (doc) {
                    setTableData([...tableData, doc])
                } else {
                    errorNotification('Doc was not added', 'Add doc Error')
                }
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Failed to add doc')
            }
        })
}
