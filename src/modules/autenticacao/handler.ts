import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/*
	Run this function locally with the following command:
	npx sls invoke local --function autenticar -p src/modules/autenticacao/mock.json
*/
class Handler {
	static async handle(
		event: APIGatewayProxyEvent,
	): Promise<APIGatewayProxyResult> {
		console.info(`Calling function in app "${process.env.APP_NAME}" with event body: ${JSON.stringify(event.body ?? '{}')}`);
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Usuário autenticado com sucesso!',
			}),
		}
	}
}

export const handler = Handler.handle;