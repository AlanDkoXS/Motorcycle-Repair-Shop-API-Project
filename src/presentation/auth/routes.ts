// src/presentation/auth/routes.ts
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { User } from '../../data/postgress/models/user.model';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authService = new AuthService(User);
        const controller = new AuthController(authService);

        // Usamos directamente el método login que ya está definido como arrow function
        router.post('/login', controller.login);

        return router;
    }
}

export default AuthRoutes;
