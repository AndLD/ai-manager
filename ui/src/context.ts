import { createContext } from 'react'
import useLayoutContext from './hooks/pages/layout'
import useChatContextValue from './hooks/pages/chat'

export const chatContext = createContext<any>({} as ReturnType<typeof useChatContextValue>)

export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)
