import { AutenticarOutput } from "./AutenticarOutput";

export class AutenticarUseCaseImpl {
    async execute(cpf: string): Promise<AutenticarOutput> {
        return {
            cpf,
            allowed: true,
            token: 'token'
        }
    }
}