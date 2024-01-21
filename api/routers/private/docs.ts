import { Router } from 'express'
import { docsControllers } from '../../controllers/private/docs'

export const docsPrivateRouter = Router()
    .get('/', docsControllers.get)
    .post('/', docsControllers.post)
    .delete('/:id', docsControllers.deleteOne)
