import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { chatContext } from './context'
import useChatContextValue from './hooks/pages/chat'

function App() {
    // useAuth()

    return (
        <BrowserRouter>
            <chatContext.Provider value={useChatContextValue()}>
                <AppRoutes />
            </chatContext.Provider>
        </BrowserRouter>
    )
}

export default App
