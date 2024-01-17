import { useState } from 'react'
import { IMessage } from '../../utils/interfaces/message'

export default function useChatContextValue() {
    const messagesState = useState<IMessage[]>([])

    return {
        messagesState,
    }
}
