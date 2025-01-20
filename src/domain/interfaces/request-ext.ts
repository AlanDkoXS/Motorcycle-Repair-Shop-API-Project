// src/domain/interfaces/request-ext.ts
import { Role } from '../../data/postgress/models/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: Role;
            };
        }
    }
}
