import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../../services/db'
import { AuthorizedRequest } from '../../utils/types'

const collectionName = 'docs'

async function get(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?._id
        const clientFilter = req.query.filters ? JSON.parse(req.query.filters as string) : {}

        const filter = { ...clientFilter, userId }

        const pagination = {
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            results: req.query.results ? parseInt(req.query.results as string) : 10,
        }
        const skip = (pagination.page - 1) * pagination.results

        const users = await db
            .collection(collectionName)
            .find(filter)
            .skip(skip)
            .limit(pagination.results)
            .toArray()

        const total = await db.collection(collectionName).countDocuments(filter)

        res.json({
            result: users.map(({ password, ...rest }) => rest),
            meta: { pagination: { ...pagination, total } },
        })
    } catch (err) {
        next(err)
    }
}

async function post(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?._id
        const data = { ...req.body, createdAt: new Date().getTime(), userId }

        const result = await db.collection(collectionName).insertOne(data)

        res.json({ result: { _id: result.insertedId, ...data } })
    } catch (err) {
        next(err)
    }
}

async function deleteOne(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const userId = req.user?._id
    const id = req.params.id
    if (!id) {
        return next(new Error('Missing parameters'))
    }
    try {
        const result = await db
            .collection(collectionName)
            .deleteOne({ _id: new ObjectId(id), userId })

        if (result.deletedCount === 0) {
            return next(new Error('Doc was not updated'))
        }

        res.json({ _id: id })
    } catch (error) {
        next(error)
    }
}

export const docsControllers = {
    get,
    post,
    deleteOne,
}
