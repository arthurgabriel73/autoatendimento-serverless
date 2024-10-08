import { autenticacaoAws } from "@modules/autenticacao";
import { Serverless } from "serverless/aws";

export const service: Serverless = {
    service: 'autoatendimento-serverless',
    frameworkVersion: '3',
    useDotenv: true,
    provider: {
        name: 'aws',
        runtime: 'nodejs20.x',
    },
    package: {
        patterns: ['!__tests__/**']
    },
    custom: {
        modulesDir: 'src/modules',
        layersDir: 'packages',
        esbuild: {
            config: 'esbuild.config.js'
        },
        'serverless-offline': {
            httpPort: 4000
        },
        prune: {
            automatic: true,
            number: 3,
            includeLayers: true
        }
    },
    layers: {
        DependenciesNodeModules: {
            package: {
                artifact: './packages/nodejs.zip'
            },
            compatibleRuntimes: ['nodejs20.x'],
            description: 'Node modules lambda layer autoatendimento serverless',
            name: 'NodeModulesLayer'
        } as any
    },
    plugins: [
        'serverless-esbuild',
        'serverless-offline',
        'serverless-dotenv-plugin',
        'serverless-prune-plugin'
    ],
    functions: {
        ...autenticacaoAws.functions
    }
}

module.exports = service;