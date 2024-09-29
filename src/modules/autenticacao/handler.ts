import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { autenticarFactory as autenticarControllerFactory } from './factory';

/*
	Run this function locally with the following command:
	npx sls invoke local --function autenticar -p src/modules/autenticacao/mock.json
*/
class Handler {
	static async handle(
		event: APIGatewayProxyEvent,
	): Promise<APIGatewayProxyResult> {
		const body = JSON.parse(event.body || '{}');
		const controller = autenticarControllerFactory();
		return controller.run(body);
	}
}

export const handler = Handler.handle;