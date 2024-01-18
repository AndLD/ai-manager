import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../../services/db'

const collectionName = 'messages'

async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const clusterId = req.params.clusterId
        if (!clusterId) {
            return res.sendStatus(500)
        }
        const items = await db
            .collection(collectionName)
            .find({
                $or: [{ clusterId }, { clusterId: null }],
            })
            .toArray()
        res.json(items)
    } catch (err) {
        next(err)
    }
}

async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body

        const result = await db.collection(collectionName).insertOne(data)

        res.json({ id: result.insertedId, ...req.body })
    } catch (err) {
        next(err)
    }
}

async function put(req: Request, res: Response, next: NextFunction) {
    // const { from, to } = req.body
    // const id = req.params.id
    // if (!id || !from || !to) {
    //     return next(new Error('Missing parameters'))
    // }
    // try {
    //     const newValues = { $set: { from, to } }
    //     const result = await db
    //         .collection(collectionName)
    //         .updateOne({ _id: new ObjectId(id) }, newValues)
    //     res.json(result)
    // } catch (error) {
    //     next(error)
    // }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    // const id = req.params.id
    // if (!id) {
    //     return next(new Error('Missing parameters'))
    // }
    // try {
    //     const result = await db
    //         .collection(collectionName)
    //         .deleteOne({ _id: new ObjectId(id) })
    //     res.json(result)
    // } catch (error) {
    //     next(error)
    // }
}

export const messagesControllers = {
    get,
    post,
    put,
    deleteOne,
}
