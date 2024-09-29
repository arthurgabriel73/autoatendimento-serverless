export interface DBClient {
    findOne(table: string, field: string, value: any): Promise<any>;
}