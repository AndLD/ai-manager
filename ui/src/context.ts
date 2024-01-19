import { createContext } from 'react'
import useLayoutContext from './hooks/pages/layout'
import useChatContextValue from './hooks/pages/chat'
import { useDashboardContextValue } from './hooks/pages/dashboard'
import { useUsersContextValue } from './hooks/pages/users'

export const chatContext = createContext<any>({} as ReturnType<typeof useChatContextValue>)

export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)

export const usersContext = createContext({} as ReturnType<typeof useUsersContextValue>)

export const dashboardContext = createContext({} as ReturnType<typeof useDashboardContextValue>)
