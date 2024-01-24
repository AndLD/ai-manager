import { useToken } from '../auth'
import { useCallback, useContext, useEffect } from 'react'
import { chatContext } from '../../context'
import { errorNotification } from '../../utils/notifications'
import { IMessage } from '../../utils/interfaces/message'
import { useFetchMessagesQuery, usePostMessageMutation } from '../../store/messages.api'

export function useFetchMessages(callback: (result: IMessage[]) => void) {
    const token = useToken()

    const fetchUsersQuery = useFetchMessagesQuery({}, { skip: !token })

    useEffect(() => {
        if (fetchUsersQuery.data) {
            callback(fetchUsersQuery.data)
        }
    }, [fetchUsersQuery.data])
}

export function usePostMessage() {
    const [isLoading, setIsLoading] = useContext(chatContext).isLoadingState
    const [messages, setMessages] = useContext(chatContext).messagesState

    const [putMessageMutation] = usePostMessageMutation()

    return useCallback(
        (text: string) => {
            const createdAt = new Date().getTime()

            setIsLoading(true)

            const newMessages = [
                ...messages,
                {
                    _id: '1',
                    text,
                    side: 'user',
                    createdAt,
                },
            ]

            setMessages(newMessages)

            putMessageMutation({
                body: { text, createdAt },
            }).then((value: any) => {
                setIsLoading(false)

                if (value.data) {
                    const { message, answer } = value.data.result

                    if (message && answer) {
                        setMessages([
                            ...newMessages.map(_message => {
                                if (_message._id === '1') {
                                    return message
                                }

                                return _message
                            }),
                            answer,
                        ])
                    } else {
                        errorNotification('Message was not added', 'Add message Error')
                    }
                } else {
                    const error = value.error?.msg || value.error?.data?.error
                    errorNotification(error, 'Failed to add message')
                }
            })
        },
        [messages]
    )
}
