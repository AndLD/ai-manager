import { useContext } from 'react'
import {
    ClockCircleOutlined,
    CoffeeOutlined,
    DollarOutlined,
    FileProtectOutlined,
    MessageOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    UserOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import DashboardCol from '../../components/Dashboard/DashboardCol'
import DashboardRow from '../../components/Dashboard/DashboardRow'
import { dashboardContext } from '../../context'

export default function DashboardRows() {
    const [statistics, setStatistics] = useContext(dashboardContext).statisticsState

    return statistics ? (
        <>
            <DashboardRow>
                <DashboardCol
                    title="Users"
                    value={statistics.usersByStatus.user}
                    icon={<UserOutlined style={{ color: 'blue' }} />}
                />
                <DashboardCol
                    title="Unlimited"
                    value={statistics.usersByStatus.unlimited}
                    icon={<CoffeeOutlined style={{ color: 'brown' }} />}
                />
                <DashboardCol
                    title="Admins"
                    value={statistics.usersByStatus.admin}
                    icon={<SafetyCertificateOutlined style={{ color: 'green' }} />}
                />
                <DashboardCol
                    title="Owners"
                    value={statistics.usersByStatus.owner}
                    icon={<DollarOutlined />}
                />
                <DashboardCol
                    title="Banned"
                    value={statistics.usersByStatus.banned}
                    icon={<StopOutlined style={{ color: 'red' }} />}
                />
            </DashboardRow>
            <DashboardRow>
                <DashboardCol
                    title="Docs"
                    value={statistics.docsTotal}
                    icon={<FileProtectOutlined />}
                />
                <DashboardCol
                    title="Messages"
                    value={statistics.messagesTotal}
                    icon={<MessageOutlined />}
                />
            </DashboardRow>
            <DashboardRow>
                <DashboardCol
                    title="Server started at"
                    value={moment(statistics.startTimestamp).format('DD.MM.YYYY HH:mm:ss')}
                    icon={<ClockCircleOutlined />}
                />
            </DashboardRow>
        </>
    ) : null
}
