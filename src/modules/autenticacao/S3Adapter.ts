import { S3 } from '@aws-sdk/client-s3';

export class S3Adapter {
    private s3!: S3;

    private async init() {
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
      if (accessKeyId === undefined || secretAccessKey === undefined) {
          throw new Error('AWS credentials not found');
      }
      this.s3 = new S3({
        credentials: {accessKeyId, secretAccessKey},
        region: process.env.AWS_REGION
      });
    }

    async getObject(key: string): Promise<any> {
        if (this.s3 === undefined) await this.init();
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        };
        const data = await this.s3.getObject(params);
        return data.Body?.transformToString('ascii');
    }
}