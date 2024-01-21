import { LogoutOutlined, MessageOutlined, SettingOutlined, UsbOutlined } from '@ant-design/icons'
import React from 'react'
import { useLogout } from '../hooks/store/auth.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToken } from '../hooks/auth'
import { parseUser } from '../utils/jwt'

export default function SideButtonWrapper() {
    const navigate = useNavigate()
    const location = useLocation()
    const logout = useLogout()

    const token = useToken()
    const user = parseUser(token)

    return (
        <div className="side-button-wrapper">
            {(user?.status === 'admin' || user?.status === 'owner') && (
                <div className="side-button" onClick={() => navigate('/admin')}>
                    <SettingOutlined />
                </div>
            )}

            {location.pathname === '/chat' ? (
                <div className="side-button" onClick={() => navigate('/docs')}>
                    <UsbOutlined />
                </div>
            ) : (
                <div className="side-button" onClick={() => navigate('/chat')}>
                    <MessageOutlined />
                </div>
            )}

            <div className="side-button" onClick={() => logout()}>
                <LogoutOutlined />
            </div>
        </div>
    )
}
