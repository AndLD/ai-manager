import { UserStatus } from './user'

export interface IStatistics {
    startTimestamp: number
    usersByStatus: { [key in UserStatus]: number }
    messagesTotal: number
    docsTotal: number
}

export interface IFetchStatisticsResponse {
    result: IStatistics
}
