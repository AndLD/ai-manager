import { IMessage } from '../../utils/interfaces/message'
import Message from './Message'
import { Tooltip } from 'antd'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { chatContext } from '../../context'

export default function ChatContainer() {
    const [docs, setDocs] = useState([])
    const [messages, setMessages] = useContext(chatContext).messagesState
    const [message, setMessage] = useState('')

    const onSubmit = () => {
        if (!docs.length) {
            return
        }

        // send
    }

    const _button = (
        <button disabled onClick={onSubmit} style={{ borderRadius: 2 }}>
            <SendOutlined style={{ fontSize: 18 }} />
        </button>
    )

    return (
        <div className="chat-container">
            <div className="chat-card">
                <div style={{ fontSize: 50, marginBottom: 15 }}>Chat</div>
                <div className="chat">
                    {messages.map((message: IMessage) => (
                        <Message key={message._id} message={message} />
                    ))}
                </div>
                <div style={{ display: 'flex' }}>
                    <input
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                onSubmit()
                            }
                        }}
                        placeholder="Type a message.."
                        className="chat-input"
                        style={{ flex: 1 }}
                        autoFocus
                    />
                    {docs.length ? (
                        _button
                    ) : (
                        <Tooltip
                            title={
                                <>
                                    <WarningOutlined style={{ fontSize: 20 }} /> Unable to send
                                    message. You have no added DOCS.
                                </>
                            }
                            overlayInnerStyle={{ color: '#fff' }}
                            color="orange"
                        >
                            {_button}
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    )
}
