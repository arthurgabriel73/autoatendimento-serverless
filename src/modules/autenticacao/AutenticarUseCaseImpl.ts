import { AutenticarOutput } from "./AutenticarOutput";
import { DBClient } from "./DBClient";
import { TokenService } from "./TokenService";

export class AutenticarUseCaseImpl {
    constructor(private readonly dbClient: DBClient, private tokenService: TokenService) {}
    
    async execute(cpf: string | null): Promise<AutenticarOutput> {
        if (!cpf) return { cpf, allowed: true, token: this.generateToken("") };
        const user = await this.dbClient.findOne('cliente', 'cpf', cpf);
        if (user) return { cpf: user.cpf, allowed: true, token: this.generateToken(cpf) };
        return { cpf: null, allowed: false };
    }

    private generateToken(subject: string): string {
        return this.tokenService.generateToken(subject);
    }
}