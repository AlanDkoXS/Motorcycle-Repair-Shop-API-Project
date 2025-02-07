// src/presentation/repair/routes.ts
import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';
import { AuthMiddleware } from '../middlewares/auth.middlewares';
import { Role } from '../../data/postgress/models/user.model';


export class RepairRoutes {
    static get routes(): Router {
        const router = Router();

        const repairService = new RepairService();
        const repairController = new RepairController(repairService);

        router.use(AuthMiddleware.protect);
        router.post('/', repairController.createRepair);
        router.use(AuthMiddleware.restricTo(Role.employee));
        router.get('/', repairController.findAllRepairs);
        router.get('/:id', repairController.findOneRepair);
        router.patch('/:id', repairController.updateRepair);
        router.delete('/:id', repairController.delete);

        return router;
    }
}
