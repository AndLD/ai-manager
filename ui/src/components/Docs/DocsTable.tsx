import { DeleteOutlined, GlobalOutlined, WarningOutlined } from '@ant-design/icons'
import GoogleSheetsIcon from '../../assets/images/google-sheets-icon.svg'
import GoogleDocsIcon from '../../assets/images/google-docs-icon.svg'
import { Button, Image, Popconfirm, Table, Tooltip } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { docsContext } from '../../context'
import { DocType, IDoc } from '../../utils/interfaces/doc'
import { useFetchDocsQuery } from '../../store/docs.api'
import { Link } from 'react-router-dom'
import { useDeleteDoc } from '../../hooks/store/docs.api'

function DocsTable() {
    const {
        tableDataState: [tableData, setTableData],
        isTableLoadingState: [isTableLoading, setIsTableLoading],
        paginationState: [pagination, setPagination],
        searchValueState: [searchValue, setSearchValue],
        typeFilterState: [typeFilter, setTypeFilter],
    } = useContext(docsContext)
    const [order, setOrder] = useState<string | undefined>()
    const [isFetchQuerySkip, setIsFetchQuerySkip] = useState(true)

    const fetchQuery = useFetchDocsQuery(
        {
            pagination,
            order,
            filters: typeFilter
                ? typeFilter && JSON.stringify({ type: { $in: typeFilter } })
                : undefined,
        },
        { skip: isFetchQuerySkip }
    )
    const deleteDoc = useDeleteDoc()

    useEffect(() => {
        if (fetchQuery.data) {
            setTableData(fetchQuery.data.result)
        }
    }, [fetchQuery.data])

    return (
        <Table
            style={{ width: 1400, maxWidth: '75vw' }}
            dataSource={tableData}
            columns={[
                {
                    title: '#',
                    align: 'center',
                    render: (_, row, index) =>
                        index + 1 + (pagination.current - 1) * pagination.pageSize,
                    width: 70,
                },
                {
                    title: 'Title',
                    dataIndex: 'title',
                    width: '20%',
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    align: 'center',
                    width: 80,
                    render: (docType: DocType, row: IDoc) => {
                        let component: any

                        switch (docType) {
                            case 'google-sheets':
                                component = (
                                    <Image
                                        style={{ width: 30 }}
                                        preview={false}
                                        src={GoogleSheetsIcon}
                                    />
                                )
                                break
                            case 'google-docs':
                                component = (
                                    <Image
                                        style={{ width: 30 }}
                                        preview={false}
                                        src={GoogleDocsIcon}
                                    />
                                )
                                break
                            case 'web-page':
                                component = (
                                    <GlobalOutlined style={{ color: 'blue', fontSize: 30 }} />
                                )
                                break
                        }
                        return component
                    },
                    filters: [
                        {
                            text: (
                                <Tooltip title="Google Sheets">
                                    <Image
                                        style={{ width: 30 }}
                                        preview={false}
                                        src={GoogleSheetsIcon}
                                    />
                                </Tooltip>
                            ),
                            value: 'google-sheets',
                        },
                        {
                            text: (
                                <Tooltip title="Google Docs">
                                    <Image
                                        style={{ width: 30 }}
                                        preview={false}
                                        src={GoogleDocsIcon}
                                    />
                                </Tooltip>
                            ),
                            value: 'google-docs',
                        },
                        {
                            text: (
                                <Tooltip title="Web Page">
                                    <GlobalOutlined style={{ color: 'blue', fontSize: 30 }} />
                                </Tooltip>
                            ),
                            value: 'web-page',
                        },
                    ],
                    filteredValue: typeFilter ? typeFilter.type : null,
                },
                {
                    title: 'References',
                    dataIndex: 'reference',
                    ellipsis: true,
                    width: '30%',

                    render: (reference: string, row: IDoc) => {
                        return (
                            <Link to={reference} title={reference}>
                                {reference}
                            </Link>
                        )
                    },
                },
                {
                    title: 'Created at',
                    dataIndex: 'createdAt',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: IDoc, row2: IDoc) => row1.createdAt - row2.createdAt,
                    sortDirections: ['descend'],
                },
                {
                    title: 'Updated at',
                    dataIndex: 'updatedAt',
                    render: (value: number) => value && new Date(value).toLocaleString(),
                    sorter: (row1: IDoc, row2: IDoc) =>
                        (row1.updatedAt || 0) - (row2.updatedAt || 0),
                    sortDirections: ['ascend', 'descend'],
                },
                {
                    width: 70,
                    align: 'center',
                    render: (_, row) => (
                        <Popconfirm
                            title="Delete the doc"
                            icon={<WarningOutlined style={{ fontSize: 20 }} />}
                            description="Are you sure? No way back"
                            onConfirm={() => deleteDoc(row._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    ),
                },
            ]}
            rowKey={(record: any) => record.id}
            pagination={pagination}
            loading={isTableLoading}
            onChange={(pagination: any, filters: any, sorter: any) => {
                setTypeFilter(filters.type)
                const sorterOrder =
                    sorter.order === 'ascend'
                        ? 'asc'
                        : sorter.order === 'descend'
                        ? 'desc'
                        : undefined
                setOrder(sorterOrder && `${sorter.field},${sorterOrder}`)
                setPagination(pagination)

                setSearchValue('')
                setIsFetchQuerySkip(false)
            }}
        />
    )
}

export default DocsTable
