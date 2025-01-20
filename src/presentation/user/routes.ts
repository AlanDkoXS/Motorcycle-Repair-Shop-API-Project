// routes/user/routes.ts
import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { createUserValidator } from '../middlewares/validators/user.validator';

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const controller = new UserController(userService);

        router.get("/", controller.findAllUsers)
        router.get("/:id", controller.findOneUser)
        router.post("/", createUserValidator, controller.createUser)
        router.patch("/:id", controller.updateUser)
        router.delete("/:id", controller.deleteUser)

        return router;
    }
}
