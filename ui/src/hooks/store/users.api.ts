import { useContext, useEffect } from 'react'
import {
    useFetchUsersQuery,
    useFetchVerifyEmailQuery,
    usePutUserMutation,
} from '../../store/users.api'
import { IFetchUsersResponse, IUserInfo, UserStatus } from '../../utils/interfaces/user'
import { errorNotification } from '../../utils/notifications'
import { useToken } from '../auth'
import { IPagination } from '../../utils/interfaces/common'
import { usersContext } from '../../context'

export function useFetchUsers(
    pagination: IPagination,
    callback: (result: IFetchUsersResponse) => void
) {
    const token = useToken()

    const fetchUsersQuery = useFetchUsersQuery(
        { pagination, filters: JSON.stringify({ active: true }) },
        { skip: !token }
    )

    useEffect(() => {
        if (fetchUsersQuery.data) {
            callback(fetchUsersQuery.data)
        }
    }, [fetchUsersQuery.data])
}

export function usePutUser() {
    const [tableData, setTableData] = useContext(usersContext).tableDataState

    const [putUserMutation] = usePutUserMutation()

    return (id: string, status: UserStatus) =>
        putUserMutation({
            id,
            body: {
                status,
            },
        }).then((value: any) => {
            if (value.data) {
                const user = value.data.result
                const newStatus = user?.status

                if (newStatus === status) {
                    setTableData([
                        ...tableData.map((tr: IUserInfo) => {
                            if (tr._id === id) {
                                return user
                            }
                            return tr
                        }),
                    ])
                } else {
                    errorNotification('User status not updated', 'Update user status Error')
                }
            } else {
                const error = value.error?.msg || value.error?.data?.error
                errorNotification(error, 'Не вдалося оновити користувача')
            }
        })
}

export function useVerifyEmail(emailVerificationToken: string | null, callback: () => void) {
    const fetchVerifyEmailQuery = useFetchVerifyEmailQuery({
        emailVerificationToken,
    })

    useEffect(() => {
        if (fetchVerifyEmailQuery.isSuccess) {
            callback()
        }
    }, [fetchVerifyEmailQuery.isSuccess])

    useEffect(() => {
        if (fetchVerifyEmailQuery.isError) {
            errorNotification('Email verification Error')
            callback()
        }
    }, [fetchVerifyEmailQuery.isError])
}
