import { AutenticarController } from "./AutenticarController";
import { AutenticarUseCase } from "./AutenticarUseCase";
import { AutenticarUseCaseImpl } from "./AutenticarUseCaseImpl";
import { PGClient } from "./PGClient";

export const autenticarFactory = (): AutenticarController => {
    // UseCase
    const autenticarUseCase: AutenticarUseCase = new AutenticarUseCaseImpl(new PGClient());

    // Controller
    const controller = new AutenticarController(autenticarUseCase);

    return controller;
}