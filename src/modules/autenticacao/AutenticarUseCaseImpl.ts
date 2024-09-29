import { AutenticarOutput } from "./AutenticarOutput";

export class AutenticarUseCaseImpl {
    async execute(cpf: string): Promise<AutenticarOutput> {
        return {
            cpf,
            allow: true,
            token: 'token'
        }
    }
}