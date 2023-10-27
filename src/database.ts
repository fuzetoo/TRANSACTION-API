import 'dotenv/config'
import { knex as SetupKnex} from 'knex'
import { env } from './env'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL Not found')
}

export const config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL,
},
useNullAsDefault: true,
migrations: {
    extension: 'ts',
    directory: './db/migrations'
    },
}

export const knex = SetupKnex(config)