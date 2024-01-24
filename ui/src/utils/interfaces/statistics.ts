import { UserStatus } from './user'

export interface IStatistics {
    startTimestamp: number
    usersByStatus: { [key in UserStatus]: number }
    messagesTotal: number
    docsTotal: number
    indexesSizeTotal: number
}

export interface IFetchStatisticsResponse {
    result: IStatistics
}
