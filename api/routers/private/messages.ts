import { Router } from 'express'
import { messagesControllers } from '../../controllers/private/messages'

export const messagesPrivateRouter = Router()
    .get('/', messagesControllers.get)
    .post('/', messagesControllers.post)
// .put('/:id', messagesControllers.put)
// .delete('/:id', messagesControllers.deleteOne)
