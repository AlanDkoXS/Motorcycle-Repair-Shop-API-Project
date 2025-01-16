import { regularExp } from "../../../config";

export class UpdateUserDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
        const { name, email, password, role } = object;
        if (!name) {
            return ["Name is required"];
        }
        if (!email) {
            return ["Email is required"];
        }
        if (!password) {
            return ["Password is required"];
        }
        if (!regularExp.password.test(password))
            return [
                "The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character ",
            ];
        if (!role) {
            return ["Missing role"];
        }
        return [undefined, new UpdateUserDTO(name, email, password, role)];
    }
}
