import { Pool } from 'pg';
import { DBClient } from './DBClient';
import { S3Adapter } from './S3Adapter';


export class PGClient implements DBClient {
    private readonly CA_FILE_NAME = process.env.CA_FILE_NAME!;
    private pool: Pool | undefined;

    constructor() {
        this.init();
    }

    private async init() {
        const ca = await this.loadPemFromS3();
        this.pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT!),
            host: process.env.DB_HOST,
            ssl: {
                rejectUnauthorized: false,
                ca
            }
        });
    }

    private async loadPemFromS3(): Promise<string> {
        const s3Adapter = new S3Adapter();
        return s3Adapter.getObject(this.CA_FILE_NAME);
    }

    public async findOne(table: string, field: string, value: any): Promise<any> {
        if (this.pool === undefined) await this.init();
        if (typeof value === 'string') value = `'${value}'`;
        const query = `SELECT * FROM ${table} WHERE ${field} = ${value}`;
        const client = await this.pool!.connect();
        try {
            const result = await client.query(query);
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}