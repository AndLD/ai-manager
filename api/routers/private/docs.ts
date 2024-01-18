import { Router } from 'express'
import { docsControllers } from '../../controllers/private/docs'

export const docsPrivateRouter = Router()
    .get('/', docsControllers.get)
    .post('/', docsControllers.post)
// .put('/:id', messagesControllers.put)
// .delete('/:id', messagesControllers.deleteOne)
