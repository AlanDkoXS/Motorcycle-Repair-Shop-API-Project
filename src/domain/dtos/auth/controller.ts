// src/presentation/auth/controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../../../presentation/services/auth.service';
import { CustomError } from '../../errors/custom.errors';

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const { user, token } = await this.authService.login({ email, password });
            res.json({ user, token });
        } catch (error) {
            this.handleError(error, res);
        }
    }
}

export default AuthController;
