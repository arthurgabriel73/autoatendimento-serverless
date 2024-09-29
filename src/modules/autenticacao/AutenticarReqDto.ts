import { z } from "zod";

export class AutenticarReqDto {
    static schema = z.object({
        cpf: z.string().min(11).max(14).refine(value => {
            return value.replace(/\D/g, '');
        }, 
        { 
            message: 'CPF deve ser válido' 
        })
    });

    private constructor(readonly cpf: string) {}

    public static from(data: AutenticarReqDto) {
        const validatedData = AutenticarReqDto.schema.parse(data);
        return new AutenticarReqDto(validatedData.cpf);
    }
}