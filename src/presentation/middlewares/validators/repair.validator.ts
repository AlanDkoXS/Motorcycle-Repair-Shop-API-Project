// middlewares/validators/repair.validator.ts
import { check } from 'express-validator';
import { validateResult } from '../validate.middleware';
export const createRepairValidator = [
    check('date')
        .exists().withMessage('Date is required')
        .isISO8601().toDate().withMessage('Invalid date format'),

    check('motorsNumber')
        .exists().withMessage('Motor number is required')
        .isString().withMessage('Motor number must be a string')
        .notEmpty().withMessage('Motor number cannot be empty'),

    check('description')
        .exists().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .notEmpty().withMessage('Description cannot be empty')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    check('userId')
        .exists().withMessage('User ID is required')
        .isUUID().withMessage('Invalid user ID format'),

    validateResult
];
