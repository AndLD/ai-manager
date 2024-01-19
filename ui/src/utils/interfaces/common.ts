export interface IPagination {
    current: number
    pageSize: number
    total?: number
}

export interface IPaginationBackend {
    page: number
    results: number
    total?: number
}
