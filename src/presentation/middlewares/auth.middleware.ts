// src/presentation/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, Role } from '../../data/postgress/models/user.model';
import { CustomError } from '../../domain';
import { UserService } from '../services/user.service';

// Interfaces
interface JwtPayload {
    id: string;
    role: Role;
    iat?: number;
    exp?: number;
}

interface RequestWithUser extends Request {
    user?: {
        id: string;
        role: Role;
    };
}

export class AuthMiddleware {
    static validateJWT = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        // Extraer el token del header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        try {
            // Verificar el token usando tu JWT_SEED
            const payload = jwt.verify(token, process.env.JWT_SEED!) as JwtPayload;
            // Agregar el id del usuario y rol al request para uso posterior
            req.user = {
                id: payload.id,
                role: payload.role
            };
            next();
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            });
        }
    };

    static checkRole = (roles: Role[]) => {
        return async (req: RequestWithUser, res: Response, next: NextFunction) => {
            const userRole = req.user?.role;
            if (!userRole) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User role not found'
                });
            }

            if (!roles.includes(userRole)) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not authorized for this action'
                });
            }

            next();
        };
    };
}
