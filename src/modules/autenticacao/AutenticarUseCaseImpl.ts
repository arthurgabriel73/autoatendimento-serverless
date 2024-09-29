import { AutenticarOutput } from "./AutenticarOutput";
import { DBClient } from "./DBClient";

export class AutenticarUseCaseImpl {
    constructor(private readonly dbClient: DBClient) {}
    
    async execute(cpf: string | null): Promise<AutenticarOutput> {
        if (!cpf) return { cpf, allowed: true, token: this.generateToken() };
        const user = await this.dbClient.findOne('cliente', 'cpf', cpf);
        if (user) return { cpf: user.cpf, allowed: true, token: this.generateToken() };
        return { cpf: null, allowed: false };
    }

    private generateToken(): string {
        return 'token';
    }
}