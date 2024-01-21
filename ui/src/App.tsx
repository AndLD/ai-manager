import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { chatContext } from './context'
import useChatContextValue from './hooks/pages/chat'
import { ConfigProvider } from 'antd'
import './App.css'

function App() {
    // useAuth()

    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#00b96b',
                    borderRadius: 2,

                    // Alias Token
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
