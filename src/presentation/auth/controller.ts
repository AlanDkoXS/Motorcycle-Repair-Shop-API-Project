// src/presentation/auth/controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

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
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ message: error });

        try {
            const { user, token } = await this.authService.login(loginUserDto!);
            res.json({
                user,
                token
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }
}
