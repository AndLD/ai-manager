import { Button } from 'antd'
import { FileAddOutlined, LoadingOutlined, ReloadOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { docsContext } from '../../context'
import axios from 'axios'
import { useToken } from '../../hooks/auth'
import { parseUser } from '../../utils/jwt'
import { errorNotification, successNotification } from '../../utils/notifications'

export default function DocsControls({ isOpenModalState }: { isOpenModalState: any }) {
    const [tableData, setTableData] = useContext(docsContext).tableDataState
    const [isRebuildLoading, setIsRebuildLoading] = useState<boolean>(false)
    const token = useToken()

    const user = parseUser(token)

    const onRebuildClick = () => {
        setIsRebuildLoading(true)
        axios.post('http://127.0.0.1:8081/api/docs/rebuild', { userId: user?._id }).then(value => {
            setIsRebuildLoading(false)

            if (value.data.result.ok === true) {
                if (value.data.result.updatedAt) {
                    setTableData(
                        tableData.map(row => ({
                            ...row,
                            updatedAt: value.data.result.updatedAt,
                        }))
                    )
                }

                successNotification('Docs were rebuilt successfully', 'Rebuild Docs Success')
            } else {
                errorNotification('Docs were not rebuilt', 'Rebuild Docs Error')
            }
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 10,
            }}
        >
            <Button
                type="primary"
                icon={<FileAddOutlined style={{ fontSize: 50 }} />}
                style={{ width: 80, height: 80, border: 'none', outline: 'none' }}
                onClick={() => isOpenModalState[1](true)}
            />
            <Button
                type="primary"
                icon={
                    isRebuildLoading ? (
                        <LoadingOutlined style={{ fontSize: 50 }} />
                    ) : (
                        <ReloadOutlined style={{ fontSize: 50 }} />
                    )
                }
                style={{ width: 80, height: 80, border: 'none', outline: 'none' }}
                disabled={isRebuildLoading || !tableData.length}
                onClick={onRebuildClick}
            />
        </div>
    )
}
