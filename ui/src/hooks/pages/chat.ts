import { useState } from 'react'
import { IFetchMessagesResponse, IMessage } from '../../utils/interfaces/message'
import { useFetchMessages } from '../store/messages.api'
import { IDoc, IFetchDocsResponse } from '../../utils/interfaces/doc'
import { useFetchDocs } from '../store/docs.api'

export default function useChatContextValue() {
    // const messagesState = useState<IMessage[]>([
    //     {
    //         _id: '1',
    //         side: 'user',
    //         text: `Super message text, ha haha ha. Super message text, ha haha ha. Super message
    //                 text, ha haha ha. Super message text, ha haha ha. Super message text, ha haha
    //                 ha. Super message text, ha haha ha. Super message text, ha haha ha.`,
    //         createdAt: new Date().getTime(),
    //     },
    //     {
    //         _id: '2',
    //         side: 'ai',
    //         text: `Super message text, ha haha ha.`,
    //         createdAt: new Date().getTime(),
    //     },
    // ])

    const isLoadingState = useState<boolean>(false)
    const messagesState = useState<IMessage[]>([])
    const docsState = useState<IDoc[]>([])

    useFetchMessages((messages: IMessage[]) => {
        messagesState[1](messages)
    })
    useFetchDocs({ pageSize: 1, current: 1 }, (data: IFetchDocsResponse) => {
        docsState[1](data.result)
    })

    return {
        messagesState,
        docsState,
        isLoadingState,
    }
}
