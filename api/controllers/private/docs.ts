import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../../services/db'
import { AuthorizedRequest } from '../../utils/types'

const collectionName = 'docs'

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

export const docsControllers = {
    get,
    post,
    put,
    deleteOne,
}
