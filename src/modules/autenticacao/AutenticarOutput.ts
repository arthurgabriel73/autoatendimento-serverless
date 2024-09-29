export class AutenticarOutput {
    constructor(readonly cpf: string, readonly allow: boolean, readonly token?: string) {}
}