// src/presentation/auth/auth.service.ts
import { JwtAdapter } from '../../config/jwt.adapter';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { CustomError } from '../../domain';
import { User } from '../../data/postgress/models/user.model';
import { EncryptAdapter } from '../../config/bcrypt.adapter';
import { CreateUserDTO } from '../../domain/dtos/users/create-user.dto';

interface SafeUserData {
    id: string;
    name: string;
    email: string;
    role: string;
}

export class AuthService {
    constructor(
        private readonly user: typeof User,
    ) { }

    private sanitizeInput(input: string): string {
        return input.trim().replace(/[<>]/g, '');
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private getUserSafeData(user: User): SafeUserData {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }

    public validateUser(createUserDto: CreateUserDTO) {
        const { name, email, password } = createUserDto;

        // Sanitize inputs
        const sanitizedName = this.sanitizeInput(name);
        const sanitizedEmail = this.sanitizeInput(email);

        // Validate name
        if (!sanitizedName) throw CustomError.badRequest('Missing name');
        if (sanitizedName.length > 50) throw CustomError.badRequest('Name too long');

        // Validate email
        if (!sanitizedEmail) throw CustomError.badRequest('Missing email');
        if (sanitizedEmail.length > 100) throw CustomError.badRequest('Email too long');
        if (!this.isValidEmail(sanitizedEmail)) throw CustomError.badRequest('Invalid email format');

        // Validate password
        if (!password) throw CustomError.badRequest('Missing password');
        if (password.length < 6) throw CustomError.badRequest('Password too short');
        if (password.length > 50) throw CustomError.badRequest('Password too long');

        return {
            ...createUserDto,
            name: sanitizedName,
            email: sanitizedEmail
        };
    }

    public async login(loginUserDto: LoginUserDto) {
        const sanitizedEmail = this.sanitizeInput(loginUserDto.email);

        const user = await this.user.findOne({
            where: { email: sanitizedEmail }
        });

        if (!user) throw CustomError.badRequest('User not found');

        const isMatching = EncryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatching) throw CustomError.badRequest('Invalid password');

        const token = await JwtAdapter.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            user: this.getUserSafeData(user),
            token: token
        };
    }

    public async create(createUserDto: CreateUserDTO) {
        // Validate and sanitize input
        const validatedData = this.validateUser(createUserDto);

        const existingUser = await this.user.findOne({
            where: { email: validatedData.email }
        });

        if (existingUser) throw CustomError.badRequest('User already exists');

        try {
            // Hash password - note that this is synchronous based on the implementation
            const hashedPassword = EncryptAdapter.hash(validatedData.password);

            const user = await this.user.create({
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                role: validatedData.role
            });

            const token = await JwtAdapter.generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            });

            if (!token) throw CustomError.internalServer('Error generating token');

            return {
                user: this.getUserSafeData(user),
                token: token
            };
        } catch (error) {
            throw CustomError.internalServer(`Error creating user: ${error}`);
        }
    }
}
