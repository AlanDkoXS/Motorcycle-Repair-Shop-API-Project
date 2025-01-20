// src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { Repair, repairStatus } from '../../data/postgress/models/repair.model';

// Extender la interfaz Request para incluir repair en el body
declare global {
    namespace Express {
        interface Request {
            body: {
                repair?: Repair;
                [key: string]: any;
            }
        }
    }
}

export const validateRepairCancellation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // ... resto del código igual ...
};
