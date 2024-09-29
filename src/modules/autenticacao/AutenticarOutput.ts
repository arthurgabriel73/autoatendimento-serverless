export class AutenticarOutput {
    constructor(readonly cpf: string, readonly allowed: boolean, readonly token?: string) {}
}