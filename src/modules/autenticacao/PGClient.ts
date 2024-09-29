import { Pool } from 'pg';
import { DBClient } from './DBClient';

export class PGClient implements DBClient {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL
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