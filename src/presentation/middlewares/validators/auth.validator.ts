import { check } from 'express-validator';
import { validateResult } from '../validate.middleware';

export const validateLoginFields = [
    check('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email cannot be empty'),

    check('password')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password cannot be empty'),

    validateResult
];
