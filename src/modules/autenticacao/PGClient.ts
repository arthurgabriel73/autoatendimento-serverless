import { Pool } from 'pg';
import { DBClient } from './DBClient';

export class PGClient implements DBClient {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT!),
            host: process.env.DB_HOST,
            ssl: false
        });
    }

    public async findOne(table: string, field: string, value: any): Promise<any> {
        if (typeof value === 'string') value = `'${value}'`;
        const query = `SELECT * FROM ${table} WHERE ${field} = ${value}`;
        const client = await this.pool.connect();
        console.log('query', query);
        try {
            const result = await client.query(query);
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}