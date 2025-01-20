import { Router } from 'express';
import { UserRoutes } from './user/routes';
import { RepairRoutes } from './repair/routes';
import { AuthRoutes } from './auth/routes'

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Rutas públicas de autenticación
        router.use('/api/v1/auth', AuthRoutes.routes);

        // Rutas protegidas
        router.use('/api/v1/users', UserRoutes.routes);
        router.use('/api/v1/repairs', RepairRoutes.routes);

        return router;
    }
}
