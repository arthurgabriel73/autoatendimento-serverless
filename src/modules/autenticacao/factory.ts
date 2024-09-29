import { AutenticarController } from "./AutenticarController";
import { AutenticarUseCase } from "./AutenticarUseCase";
import { AutenticarUseCaseImpl } from "./AutenticarUseCaseImpl";
import { JwtService } from "./JwtService";
import { PGClient } from "./PGClient";

export const autenticarFactory = (): AutenticarController => {
    // UseCase
    const autenticarUseCase: AutenticarUseCase = new AutenticarUseCaseImpl(new PGClient(), new JwtService());

    // Controller
    const controller = new AutenticarController(autenticarUseCase);

    return controller;
}