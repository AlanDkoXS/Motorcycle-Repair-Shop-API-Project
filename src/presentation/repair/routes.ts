// src/presentation/repair/routes.ts
import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';
import { AuthMiddleware } from '../middlewares/auth.middlewares';


export class RepairRoutes {
    static get routes(): Router {
        const router = Router();

        const repairService = new RepairService();
        const repairController = new RepairController(repairService);

        router.post('/', repairController.createRepair);

        router.use(AuthMiddleware.protect);

        router.get('/', repairController.findAllRepairs);
        router.get('/:id', repairController.findOneRepair);
        router.patch('/:id', repairController.updateRepair);
        router.delete('/:id', repairController.delete);

        return router;
    }
}
