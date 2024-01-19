import { Express, Router } from 'express'
import usersPublicRouter from '../routers/public/users'
import { isAuthorized, userHasAccess } from '../middlewares/users'
import authPublicRouter from '../routers/public/auth'
import authPrivateRouter from '../routers/private/auth'
import { messagesPrivateRouter } from '../routers/private/messages'
import { setReqEntity } from '../middlewares/decorators'
import { entities } from '../utils/constants'
import { statisticsPrivateRouter } from '../routers/private/statistics'
import { docsPrivateRouter } from '../routers/private/docs'
import { usersPrivateRouter } from '../routers/private/users'

export function setupRouters(app: Express) {
    const apiRouter = Router()
    app.use('/api', apiRouter)

    // Unauthorized router
    const publicRouter = Router()
    apiRouter.use('/public', publicRouter)

    publicRouter.use('/auth', authPublicRouter)
    publicRouter.use('/users', setReqEntity(entities.USERS), usersPublicRouter)

    // Authorized router
    const privateRouter = Router()
    apiRouter.use('/private', isAuthorized, privateRouter)

    privateRouter.use('/auth', authPrivateRouter)
    privateRouter.use('/users', usersPrivateRouter)
    privateRouter.use('/messages', messagesPrivateRouter)
    privateRouter.use('/docs', docsPrivateRouter)
    privateRouter.use('/statistics', statisticsPrivateRouter)
}
