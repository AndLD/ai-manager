import { Tooltip } from 'antd'
import { RobotOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { IMessage } from '../../utils/interfaces/message'

export default function Message({ message }: { message: IMessage }) {
    return (
        <div className={`message-wrapper ${message.side === 'user' ? 'left' : 'right'}`}>
            <div className="message">
                <Tooltip
                    title={message.side === 'user' ? 'You' : 'AI Manager'}
                    placement={message.side === 'user' ? 'right' : 'left'}
                >
                    <div className="message-avatar">
                        {message.side === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    </div>
                </Tooltip>
                <div className="message-text">{message.text}</div>
                <div className="message-time">4:45 AM</div>
            </div>
        </div>
    )
}
