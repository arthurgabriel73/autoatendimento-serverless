export interface TokenService {
    generateToken(subject: string): string;
}