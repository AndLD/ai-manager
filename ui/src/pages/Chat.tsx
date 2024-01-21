import React from 'react'
import '../styles/Chat.css'

import { chatContext } from '../context'
import SideButtonWrapper from '../components/SideButtonWrapper'
import useChatContextValue from '../hooks/pages/chat'
import ChatContainer from '../components/Chat/ChatContainer'

export default function Chat() {
    return (
        <chatContext.Provider value={useChatContextValue()}>
            <ChatContainer />
            <SideButtonWrapper />
        </chatContext.Provider>
    )
}
