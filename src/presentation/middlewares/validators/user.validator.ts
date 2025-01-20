// middlewares/validators/user.validator.ts
import { check } from 'express-validator';
import { validateResult } from '../validate.middleware';

export const createUserValidator = [
    check('name')
        .exists().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 3, max: 80 }).withMessage('Name must be between 3 and 80 characters'),

    check('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email cannot be empty'),

    check('password')
        .exists().withMessage('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{10,16}$/)
        .withMessage('Password must be between 10-16 characters, include upper and lowercase letters, and at least one special character'),

    validateResult
];
