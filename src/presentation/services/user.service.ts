import { isErrored } from "stream";
import { Status, User } from "../../data/postgress/models/user.model";
import { CustomError } from "../../domain";
import { CreateUserDTO } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserDTO } from "../../domain/dtos/users/update-user.dto";

export class UserService {
    async findOne(id: string) {
        const user = await User.findOne({
            where: {
                id: id,
                status: Status.available
            }
        });

        if (!user) {
            throw CustomError.notFound("User not found");
        }
        return user;
    }

    async findAll() {
        try {
            const users = await User.find({
                where: {
                    status: Status.available
                }
            });
            return users;
        } catch (error) {
            throw CustomError.internalServer("Error to get users");
        }
    }

    async create(data: CreateUserDTO) {
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.role = data.role;

        try {
            return await user.save();
        } catch (error) {
            throw CustomError.internalServer("Error to create user");
        }
    }

    async update(id: string, data: UpdateUserDTO) {
        const user = await this.findOne(id)
        user.name = data.name;
        user.email = data.email;
        try {
            await user.save();
            return {
                message: "Updated user",
            }
        } catch (error) {
            throw CustomError.internalServer("Error to update user")
        }

    }

    async delete(id: string) {
        const user = await this.findOne(id);
        user.status = Status.disabled
        try {
            await user.save();
            return { ok: true };
        } catch (error) {
            throw CustomError.internalServer("Error to delete user")
        }

    }
}
