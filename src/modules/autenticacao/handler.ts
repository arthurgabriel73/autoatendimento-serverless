import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { autenticarFactory as autenticarControllerFactory } from './factory';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

/*
	Run this function locally with the following command:
	npx sls invoke local --function autenticar -p src/modules/autenticacao/mock.json
*/
class Handler {
	static async handle(
		event: APIGatewayProxyEvent,
	): Promise<APIGatewayProxyResult> {
		try {
			const body = JSON.parse(event.body || '{}');
			const controller = autenticarControllerFactory();
			return controller.run(body);
		} catch (error) {
			if (error instanceof ZodError) {
				const zodError = fromZodError(error);
				return {
					statusCode: 400,
					body: JSON.stringify({
						message: 'Erro de validação',
						details: JSON.stringify({ ...zodError, stack: zodError.stack })
					}),
				};
			}
			return {
				statusCode: 500,
				body: JSON.stringify({
					message: 'Erro interno'
				}),
			};
		}
	}
}

export const handler = Handler.handle;