import { TokenService } from "./TokenService";
import jwt from 'jsonwebtoken';

export class JwtService implements TokenService {
    private readonly secret: string;

    constructor(secret = process.env.JWT_SECRET) {
        if (!secret) throw new Error('Missing JWT_SECRET');
        this.secret = secret;
    }
    
    generateToken(params: Object): string {
        return jwt.sign(params, this.secret);
    }
}