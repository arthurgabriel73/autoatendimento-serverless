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
      securityGroupIds: [process.env.SECURITY_GROUP_ID as string],
      subnetIds: [process.env.SUBNET_ID_1A as string, process.env.SUBNET_ID_1B as string]
    }
  }
}