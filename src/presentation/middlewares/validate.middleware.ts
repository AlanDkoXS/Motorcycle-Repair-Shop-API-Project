// middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error: any) {
        res.status(400).json({
            errors: error.array().map((err: any) => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
};
