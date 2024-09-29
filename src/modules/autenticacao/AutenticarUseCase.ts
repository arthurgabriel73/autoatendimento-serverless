import { AutenticarOutput } from "./AutenticarOutput";

export interface AutenticarUseCase {
    execute(cpf: string | null): Promise<AutenticarOutput>;
}