import { IMessage } from '../../utils/interfaces/message'
import Message from './Message'
import { Tooltip } from 'antd'
import { SendOutlined, WarningOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { chatContext } from '../../context'
import { usePostMessage } from '../../hooks/store/messages.api'
import LoadingBanner from './LoadingBanner'

export default function ChatContainer() {
    const [docs, setDocs] = useContext(chatContext).docsState
    const [messages, setMessages] = useContext(chatContext).messagesState
    const [message, setMessage] = useState('')

    const chatContainerRef = useRef(null)

    useEffect(() => {
        setTimeout(() => scrollToBottom(), 4000)
    }, [])

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            // Using 'scrollTop' to set the scroll position
            ;(chatContainerRef.current as any).scrollTop = (
                chatContainerRef.current as any
            ).scrollHeight
        }
    }

    const postMessage = usePostMessage()

    const onSubmit = () => {
        if (!docs.length || !message.length) {
            return
        }

        setMessage('')

        postMessage(message)
    }

    const _button = (
        <button disabled={!docs.length} onClick={onSubmit} style={{ borderRadius: 2 }}>
            <SendOutlined style={{ fontSize: 18 }} />
        </button>
    )

    return (
        <div className="chat-container">
            <div className="chat-card">
                <div style={{ fontSize: 50, marginBottom: 15 }}>Chat</div>
                <div ref={chatContainerRef} className="chat">
                    {messages.map((message: IMessage) => (
                        <Message key={message._id} message={message} />
                    ))}
                    <LoadingBanner />
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
