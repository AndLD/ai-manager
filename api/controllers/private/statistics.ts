import { Response } from 'express'
import { db } from '../../services/db'
import { usersService } from '../../services/users'
import { apiUtils } from '../../utils/api'
import { entities, startTimestamp } from '../../utils/constants'
import { tryCatch } from '../../utils/decorators'
import { Utils } from '../../utils/utils'
import path from 'path'

async function getStatistics(_: any, res: Response) {
    const usersByStatus = await usersService.countUsersByState(res)
    if (!usersByStatus) {
        return
    }

    // Get total count of documents for each collection
    const totals: any = {}
    for (const entity of Object.keys(entities)) {
        const collection = entity.toLowerCase()

        const key = `${collection}Total`

        totals[key] = await db.collection(collection).countDocuments()
    }

    const indexesSizeTotal = Utils.getDirectorySizeSync(path.join(__dirname, '../../../store'))

    const result = {
        usersByStatus,
        ...totals,
        startTimestamp,
        indexesSizeTotal,
    }

    apiUtils.sendResult(res, result)
}

export const privateStatisticsControllers = {
    getStatistics: tryCatch(getStatistics),
}
