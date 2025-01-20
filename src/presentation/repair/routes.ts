// src/presentation/repair/routes.ts
import { Router } from 'express';
import { RepairController } from '../repair/controller';
import { RepairService } from '../services/repair.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { validateRepairCancellation } from '../middlewares/validation.middleware';
import { Role } from '../../data/postgress/models/user.model';
import { createRepairValidator } from '../middlewares/validators/repair.validator';
export class RepairRoutes {
    static get routes(): Router {
        const router = Router();
        const repairService = new RepairService();
        const controller = new RepairController(repairService);

        // Aplicar middleware de autenticación a todas las rutas
        router.use(AuthMiddleware.validateJWT);

        // Rutas con validación de roles
        router.get('/',
            AuthMiddleware.checkRole([Role.employee]),
            controller.findAllRepairs
        );

        router.get('/:id',
            AuthMiddleware.checkRole([Role.employee]),
            controller.findOneRepair
        );

        router.post('/',
            AuthMiddleware.checkRole([Role.client]),
            createRepairValidator, // Agregamos la validación aquí
            controller.createRepair
        );

        router.patch('/:id',
            AuthMiddleware.checkRole([Role.employee]),
            controller.updateRepair
        );

        router.delete('/:id',
            validateRepairCancellation,
            controller.delete
        );

        return router;
    }
}
