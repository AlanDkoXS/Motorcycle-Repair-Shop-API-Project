// src/domain/dtos/auth/login-user.dto.ts
export class LoginUserDto {
    constructor(
        public email: string,
        public password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = object;

        if (!email) return ['Email is required'];
        if (!password) return ['Password is required'];

        return [undefined, new LoginUserDto(email, password)];
    }
}
