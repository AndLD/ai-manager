import { Menu } from 'antd'
import { DashboardOutlined, TeamOutlined, CommentOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import { IUserState } from '../../utils/interfaces/user'
import { useState } from 'react'
import { parseUser } from '../../utils/jwt'

export default function AdminMenu() {
    const isMenuCollapsed = useAppSelector(state => state.adminReducer.isMenuCollapsed)
    const token = useAppSelector(state => state.appReducer.token)
    const [user, setUser] = useState<IUserState | null>(parseUser(token))

    const location = useLocation()

    const style = {
        fontSize: '25px',
        transform: isMenuCollapsed ? 'translateX(-25%)' : '',
    }

    return (
        <Menu
            style={{ fontSize: '15px' }}
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname || '/admin']}
        >
            <Menu.Item key="/admin" icon={<DashboardOutlined style={style} />}>
                <Link to={'/admin'}>Dashboard</Link>
            </Menu.Item>

            {/*{user?.status === 'admin' && (*/}
            {/*    <Menu.Item key="/admin/settings" icon={<SettingOutlined style={style} />}>*/}
            {/*        <Link to={'/admin/settings'}>Налаштування</Link>*/}
            {/*    </Menu.Item>*/}
            {/*)}*/}

            {user?.status === 'admin' && (
                <Menu.Item key="/admin/users" icon={<TeamOutlined style={style} />}>
                    <Link to={'/admin/users'}>Users</Link>
                </Menu.Item>
            )}
            <Menu.Item key="/chat" icon={<CommentOutlined style={style} />}>
                <a href={'/chat'}>Chat</a>
            </Menu.Item>
        </Menu>
    )
}
