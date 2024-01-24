import { Tooltip } from 'antd'
import { RobotOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { IMessage } from '../../utils/interfaces/message'
import { Utils } from '../../utils/utils'

export default function Message({ message }: { message: IMessage }) {
    return (
        <div className={`message-wrapper ${message.side === 'user' ? 'left' : 'right'}`}>
            <div className="message">
                <Tooltip
                    className="message-avatar"
                    title={message.side === 'user' ? 'You' : 'AI Manager'}
                    placement={message.side === 'user' ? 'right' : 'left'}
                >
                    <div>{message.side === 'user' ? <UserOutlined /> : <RobotOutlined />}</div>
                </Tooltip>
                <div className="message-text">{message.text}</div>
                <div className="message-time">{Utils.formatTimestamp(message.createdAt)}</div>
            </div>
        </div>
    )
}
