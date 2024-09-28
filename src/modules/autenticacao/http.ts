import type { Functions } from 'serverless/aws';

export const AutenticacaoFunctionsHttp: Functions = {
    Autenticar: {
        layers: [{ Ref: 'DependenciesNodeModuleLambdaLayer' }],
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
        ]
    }
}