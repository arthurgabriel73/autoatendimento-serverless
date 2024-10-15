import { Pool } from 'pg';
import { DBClient } from './DBClient';
import AWS from 'aws-sdk';
const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME!;
const caFileName = process.env.CA_FILE_NAME!;

export class PGClient implements DBClient {
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
        const params = {
            Bucket: bucketName,
            Key: caFileName
        };

        const data = await s3.getObject(params).promise();
        return data.Body!.toString('ascii');
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