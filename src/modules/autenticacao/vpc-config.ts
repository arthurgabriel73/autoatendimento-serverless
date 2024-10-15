import * as dotenv from 'dotenv';

dotenv.config();

export const securityGroupIds = [process.env.SECURITY_GROUP_ID!]
export const subnetIds = [process.env.SUBNET_ID_1A!, process.env.SUBNET_ID_1B!]