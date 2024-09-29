import { AutenticarReqDto } from "./AutenticarReqDto";
import { AutenticarUseCase } from "./AutenticarUseCase";

export class AutenticarController {
    constructor(private readonly autenticarUseCase: AutenticarUseCase) {}

    async run(reqBody: AutenticarReqDto): Promise<{statusCode: number, body: string}> {
        const { cpf } = AutenticarReqDto.from(reqBody);
        const output = await this.autenticarUseCase.execute(cpf);
        return {
			statusCode: 200,
			body: JSON.stringify(output)
		}
    }
}