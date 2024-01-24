import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../../services/db'
import { AuthorizedRequest } from '../../utils/types'
import axios from 'axios'
import { IMessage } from '../../utils/interfaces/message'

const collectionName = 'messages'

async function get(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?._id
        const items = await db
            .collection(collectionName)
            .find({
                userId,
            })
            .toArray()
        res.json(items)
    } catch (err) {
        next(err)
    }
}

async function post(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?._id as string
        const message = {
            text: req.body.text,
            createdAt: req.body.createdAt || new Date().getTime(),
            userId,
            side: 'user',
        }

        const messageInsertResult = await db.collection(collectionName).insertOne(message)

        const aiApiResponse = await axios.post('http://127.0.0.1:8081/api/message', {
            text: req.body.text,
            userId,
        })

        const { response: answerText, metadata } = aiApiResponse.data.result

        const answer = {
            text: answerText,
            createdAt: new Date().getTime(),
            userId,
            side: 'ai',
        }

        const answerInsertResult = await db.collection(collectionName).insertOne(answer)

        res.json({
            result: {
                message: { _id: messageInsertResult.insertedId, ...message },
                answer: { _id: answerInsertResult.insertedId, ...answer },
            },
        })
    } catch (err) {
        next(err)
    }
}

export const messagesControllers = {
    get,
    post,
}
