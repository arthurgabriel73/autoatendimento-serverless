import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/*
	Run this function locally with the following command:
	npx sls invoke local --function Autenticar -p src/modules/autenticacao/mock.json
*/
class Handler {
	static async handle(
		event: APIGatewayProxyEvent,
	): Promise<void> {
		console.info(`Calling function in app "${process.env.APP_NAME}" with event: ${JSON.stringify(event)}`);
	}
}

export const handler = Handler.handle;