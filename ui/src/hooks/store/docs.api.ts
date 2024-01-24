import { IPagination } from '../../utils/interfaces/common'
import { useToken } from '../auth'
import { useContext, useEffect } from 'react'
import { docsContext } from '../../context'
import { errorNotification } from '../../utils/notifications'
import { IDoc, IDocPostBody, IFetchDocsResponse } from '../../utils/interfaces/doc'
import { useDeleteDocMutation, useFetchDocsQuery, usePostDocMutation } from '../../store/docs.api'

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

    const [putDocMutation] = usePostDocMutation()

    return (body: IDocPostBody) =>
        putDocMutation({
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

export function useDeleteDoc() {
    const [tableData, setTableData] = useContext(docsContext).tableDataState

    const [putDocMutation] = useDeleteDocMutation()

    return (id: string) =>
        putDocMutation({
            id,
        }).then((value: any) => {
            if (value.data) {
                const _id: string = value.data._id

                if (_id === id) {
                    setTableData(tableData.filter(row => row._id !== id))
                } else {
                    errorNotification('Doc was not deleted', 'Delete doc Error')
                }
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Failed to delete doc')
            }
        })
}
