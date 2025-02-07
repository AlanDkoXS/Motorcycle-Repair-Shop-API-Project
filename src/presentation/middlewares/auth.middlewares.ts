import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config/jwt.adapter';
import { User, Status, Role } from '../../data/postgress/models/user.model';

export class AuthMiddleware {
    static async protect(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized, please login again" });
        }

        if (!authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const token = authorization.split(" ")[1] || "";

        try {
            const payload = (await JwtAdapter.validateToken(token)) as { id: string };
            if (!payload) return res.status(401).json({ message: "Invalid token, login again" });

            const user = await User.findOne({
                where: { id: payload.id, status: Status.available },
            });

            if (!user)
                return res
                    .status(401)
                    .json({ message: "User not found, login again" });

            req.body.sessionUser = user;

            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static restricTo = (...roles: Role[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.body.sessionUser.role)) {
                return res.status(401).json({ message: "You do not have permission to perform this action" });
            }
            next();
        }

    }
}
