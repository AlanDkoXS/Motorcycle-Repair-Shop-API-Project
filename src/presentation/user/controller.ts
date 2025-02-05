import { Response, Request } from "express";
import { CustomError } from "../../domain";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserDTO } from "../../domain/dtos/users/update-user.dto";


export class UserController {
    constructor(
        private readonly userService: UserService) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    findAllUsers = (req: Request, res: Response) => {
        this.userService
            .findAll()
            .then((data) => res.status(200).json(data))
            .catch((error: any) => this.handleError(error, res));
    };
    findOneUser = (req: Request, res: Response) => {
        const { id } = req.params;
        this.userService
            .findOne(id)
            .then((data) => res.status(200).json(data))
            .catch((error: any) => this.handleError(error, res));
    };
    createUser = (req: Request, res: Response) => {
        const [error, CreateUserDto] = CreateUserDTO.create(req.body)

        if (error) return res.status(422).json({ message: error });

        this.userService
            .create(CreateUserDto!)
            .then((data) => res.status(200).json(data))
            .catch((error: any) => this.handleError(error, res));

    };
    updateUser = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, UpdateUserDto] = UpdateUserDTO.create(req.body);

        if (error) return res.status(422).json({ message: error });
        
        this.userService
            .update(id, UpdateUserDto!)
            .then((data) => res.status(200).json(data))
            .catch((error: any) => this.handleError(error, res));
    };
    deleteUser = (req: Request, res: Response) => {
        const { id } = req.params;
        this.userService
            .delete(id)
            .then((data) => res.status(204).json(data))
            .catch((error: any) => this.handleError(error, res));

    };
}
