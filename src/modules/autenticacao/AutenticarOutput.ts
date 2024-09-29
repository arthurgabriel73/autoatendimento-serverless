export class AutenticarOutput {
    constructor(readonly cpf: string | null, readonly allowed: boolean, readonly token?: string) {}
}