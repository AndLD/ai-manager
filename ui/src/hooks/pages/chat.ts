import { useState } from 'react'
import { IMessage } from '../../utils/interfaces/message'

export default function useChatContextValue() {
    const messagesState = useState<IMessage[]>([
        {
            _id: '1',
            side: 'user',
            text: `Super message text, ha haha ha. Super message text, ha haha ha. Super message
                    text, ha haha ha. Super message text, ha haha ha. Super message text, ha haha
                    ha. Super message text, ha haha ha. Super message text, ha haha ha.`,
            timestamp: new Date().getTime(),
        },
        {
            _id: '2',
            side: 'ai',
            text: `Super message text, ha haha ha.`,
            timestamp: new Date().getTime(),
        },
    ])

    return {
        messagesState,
    }
}
