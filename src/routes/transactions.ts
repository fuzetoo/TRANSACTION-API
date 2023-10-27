import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from "../database"
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"

export async function transactionsRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async (request, reply) => {
        console.log(`[${request.method}], [${request.url}]`)
    })


    app.get('/', {
        preHandler: [checkSessionIdExists]
    } ,async (request) => {
        const transactions = await knex('transactions').select()
        const { sessionId } = request.cookies
        return { transactions }
    })

    app.get('/:id', {
        preHandler: [checkSessionIdExists]
    } ,async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
        .where({
            session_id: sessionId,
            id,
        })
        .andWhere('session_id')
       .first()
        return { transaction }
    })

    app.get('/summary', {
        preHandler: [checkSessionIdExists]
    } ,async (request) => {
        const { sessionId } = request.cookies
        const summary = await knex('transactions').sum('ammount', { as: 'ammounts'})
        .first()
        return { summary }
    })


    app.post('/', {
        preHandler: [checkSessionIdExists]
    } ,async (request, reply) => {
        
        const createTransactionBodySchema = z.object({
            title: z.string(),
            ammount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, ammount, type} = createTransactionBodySchema.parse(request.body)
        let sessionId = request.cookies.sessionId

        if(!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }



        await knex('transactions')
        .insert({
            id: randomUUID(),
            title,
            ammount: type === 'credit' ? ammount : ammount * -1,
            session_id: sessionId,
        })

        return reply.status(201).send()
    })  
}