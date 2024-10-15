import type { Functions } from 'serverless/aws';
import { securityGroupIds, subnetIds } from './vpc-config';

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
      securityGroupIds, subnetIds
    }
  }
}