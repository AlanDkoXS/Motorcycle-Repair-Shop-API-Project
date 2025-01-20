// src/presentation/auth/routes.ts
import { Router } from 'express';
import { AuthController } from '../../../presentation/auth/controller';
import { AuthService } from '../../../presentation/services/auth.service';

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);

        router.post('/login', controller.login);

        return router;
    }
}

// Asegurarnos de exportar la clase por defecto también
export default AuthRoutes;
