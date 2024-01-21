import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { db } from '../../services/db'
import { AuthorizedRequest } from '../../utils/types'

const collectionName = 'docs'

async function get(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
        const clientFilter = req.query.filters ? JSON.parse(req.query.filters as string) : {}
        const pagination = {
            page: req.query.page ? parseInt(req.query.page as string) : 1,
            results: req.query.results ? parseInt(req.query.results as string) : 10,
        }
        const skip = (pagination.page - 1) * pagination.results

        const users = await db
            .collection(collectionName)
            .find(clientFilter)
            .skip(skip)
            .limit(pagination.results)
            .toArray()

        const total = await db.collection(collectionName).countDocuments(clientFilter)

        res.json({
            result: users.map(({ password, ...rest }) => rest),
            meta: { pagination: { ...pagination, total } },
        })
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

async function deleteOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    if (!id) {
        return next(new Error('Missing parameters'))
    }
    try {
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) })
        res.json(result)
    } catch (error) {
        next(error)
    }
}

export const docsControllers = {
    get,
    post,
    deleteOne,
}
