import { AutenticarController } from "./AutenticarController";
import { AutenticarUseCase } from "./AutenticarUseCase";
import { AutenticarUseCaseImpl } from "./AutenticarUseCaseImpl";

export const autenticarFactory = (): AutenticarController => {
    // UseCase
    const autenticarUseCase: AutenticarUseCase = new AutenticarUseCaseImpl();

    // Controller
    const controller = new AutenticarController(autenticarUseCase);

    return controller;
}