import {
    CoffeeOutlined,
    DollarOutlined,
    QuestionOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Select, Table } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { usersContext } from '../../context'
import { useToken } from '../../hooks/auth'
import { usePutUser } from '../../hooks/store/users.api'
import { useFetchUsersQuery } from '../../store/users.api'
import { IUserInfo, UserStatus } from '../../utils/interfaces/user'
import { parseUser } from '../../utils/jwt'

function UsersTable() {
    const token = useToken()
    const {
        tableDataState: [tableData, setTableData],
        isTableLoadingState: [isTableLoading, setIsTableLoading],
        paginationState: [pagination, setPagination],
        searchValueState: [searchValue, setSearchValue],
        statusFilterState: [statusFilter, setStatusFilter],
    } = useContext(usersContext)
    const [order, setOrder] = useState<string | undefined>()
    const [isFetchUsersQuerySkip, setIsFetchUsersQuerySkip] = useState(true)

    const fetchUsersQuery = useFetchUsersQuery(
        {
            pagination,
            order,
            filters: statusFilter
                ? statusFilter && JSON.stringify({ status: { $in: statusFilter } })
                : undefined,
        },
        { skip: isFetchUsersQuerySkip }
    )

    const putUser = usePutUser()

    useEffect(() => {
        if (fetchUsersQuery.data) {
            setTableData(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])

    return (
        <Table
            dataSource={tableData}
            columns={[
                {
                    title: '#',
                    render: (_, row, index) =>
                        index + 1 + (pagination.current - 1) * pagination.pageSize,
                    width: 70,
                },
                {
                    title: 'ID',
                    dataIndex: '_id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                },
                {
                    title: 'Company',
                    dataIndex: 'company',
                },
                {
                    title: 'Role',
                    dataIndex: 'role',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    render: (status: UserStatus, row: IUserInfo) => {
                        if (row._id === parseUser(token)?._id) {
                            let component: any

                            switch (status) {
                                case 'admin':
                                    component = (
                                        <SafetyCertificateOutlined style={{ color: 'green' }} />
                                    )
                                    break
                                case 'unlimited':
                                    component = <CoffeeOutlined style={{ color: 'brown' }} />
                                    break
                                case 'user':
                                    component = <UserOutlined style={{ color: 'blue' }} />
                                    break
                                case 'banned':
                                    component = <StopOutlined style={{ color: 'red' }} />
                                    break
                                case 'owner':
                                    component = <QuestionOutlined />
                            }
                            return (
                                <>
                                    {component} {status[0].toUpperCase() + status.slice(1)}
                                </>
                            )
                        }

                        return (
                            <Select
                                defaultValue={status}
                                style={{ width: '100%' }}
                                onChange={status => putUser(row._id, status)}
                            >
                                <Select.Option value="admin">
                                    <SafetyCertificateOutlined style={{ color: 'green' }} /> Admin
                                </Select.Option>
                                <Select.Option value="unlimited">
                                    <CoffeeOutlined style={{ color: 'brown' }} /> Unlimited
                                </Select.Option>
                                <Select.Option value="user">
                                    <UserOutlined style={{ color: 'blue' }} /> User
                                </Select.Option>
                                <Select.Option value="banned">
                                    <StopOutlined style={{ color: 'red' }} /> Banned
                                </Select.Option>
                                <Select.Option value="owner">
                                    <DollarOutlined /> Owner
                                </Select.Option>
                            </Select>
                        )
                    },
                    filters: [
                        {
                            text: (
                                <>
                                    <SafetyCertificateOutlined style={{ color: 'green' }} /> Admin
                                </>
                            ),
                            value: 'admin',
                        },
                        {
                            text: (
                                <>
                                    <CoffeeOutlined style={{ color: 'brown' }} /> Unlimited
                                </>
                            ),
                            value: 'unlimited',
                        },
                        {
                            text: (
                                <>
                                    <UserOutlined style={{ color: 'blue' }} /> User
                                </>
                            ),
                            value: 'user',
                        },
                        {
                            text: (
                                <>
                                    <StopOutlined style={{ color: 'red' }} /> Banned
                                </>
                            ),
                            value: 'banned',
                        },
                        {
                            text: (
                                <>
                                    <DollarOutlined /> Owner
                                </>
                            ),
                            value: 'owner',
                        },
                    ],
                    filteredValue: statusFilter ? statusFilter.status : null,
                },

                {
                    title: 'Registered at',
                    dataIndex: 'createdAt',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: any, row2: any) => row1.timestamp - row2.timestamp,
                    sortDirections: ['descend'],
                },
                {
                    title: 'Lastly updated at',
                    dataIndex: 'updatedAt',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: any, row2: any) =>
                        row1.lastUpdateTimestamp - row2.lastUpdateTimestamp,
                    sortDirections: ['ascend', 'descend'],
                },
            ]}
            rowKey={(record: any) => record.id}
            pagination={pagination}
            loading={isTableLoading}
            onChange={(pagination: any, filters: any, sorter: any) => {
                setStatusFilter(filters.status)
                const sorterOrder =
                    sorter.order === 'ascend'
                        ? 'asc'
                        : sorter.order === 'descend'
                        ? 'desc'
                        : undefined
                setOrder(sorterOrder && `${sorter.field},${sorterOrder}`)
                setPagination(pagination)

                setSearchValue('')
                setIsFetchUsersQuerySkip(false)
            }}
        />
    )
}

export default UsersTable
