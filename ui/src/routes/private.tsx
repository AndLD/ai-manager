import { RouteObject } from 'react-router-dom'
import Chat from '../pages/Chat'
import Dashboard from '../pages/Dashboard'
import AdminLayout from '../components/AdminLayout/AdminLayout'
// import Settings from '../pages/Settings'
import Users from '../pages/Users'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />,
            },
            {
                path: '/admin/users',
                element: <Users />,
            },
            // {
            //     path: '/settings',
            //     element: <Settings />
            // }
        ],
    },

    // {
    //     path: '/data',
    //     element: <Data />,
    // },
    { path: '/chat', element: <Chat /> },
]

export default privateRoutes
