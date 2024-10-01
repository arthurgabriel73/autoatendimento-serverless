import { TokenService } from "./TokenService";
import jwt from 'jsonwebtoken';

export class JwtService implements TokenService {
    private readonly SECRET: string;

    constructor(secret = process.env.JWT_SECRET) {
        if (!secret) throw new Error('Missing JWT_SECRET');
        this.SECRET = secret;
    }
    
    generateToken(subject: string): string {
        const token = jwt.sign({ sub: subject }, this.SECRET, { header: { typ: 'JWT', alg: 'HS256' }, expiresIn: '1h' });
        return token;
    }
}