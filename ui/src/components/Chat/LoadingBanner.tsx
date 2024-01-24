import { LoadingOutlined, RobotOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { chatContext } from '../../context'

export default function LoadingBanner() {
    const [isLoading, setIsLoading] = useContext(chatContext).isLoadingState

    return (
        <>
            {isLoading && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.1)',
                        padding: '5px 0',
                        alignItems: 'center',
                        gap: 5,
                        color: '#fff',
                    }}
                >
                    <span className="message-avatar" style={{ fontSize: 20, padding: '2px 7px' }}>
                        <RobotOutlined />
                    </span>{' '}
                    AI Manager think <LoadingOutlined />
                </div>
            )}
        </>
    )
}
