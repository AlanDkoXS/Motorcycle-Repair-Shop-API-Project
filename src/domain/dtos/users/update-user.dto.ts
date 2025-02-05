export class UpdateUserDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
        const { name, email } = object;
        if (!name) return ["Name is required"];
        if (!email) return ["Email is required"];

        return [undefined, new UpdateUserDTO(name, email)];
    }
}
