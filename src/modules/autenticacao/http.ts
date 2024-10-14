import type { Functions } from 'serverless/aws';

export const autenticacaoFunctionsHttp: Functions = {
    autenticar: {
        layers: [{ Ref: 'DependenciesNodeModulesLambdaLayer' }],
        handler: '${self:custom.modulesDir}/autenticacao/handler.handler',
        timeout: 10,
        events: [
            {
                http: {
                    method: 'POST',
                    path: '/autenticar',
                    cors: true
                }
            }
        ],
        vpc: {
          securityGroupIds: [process.env.SECURITY_GROUP_ID!],
          subnetIds: [process.env.SUBNET_ID!]
        }
    
    }
}