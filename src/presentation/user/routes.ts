import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const userCcontroller = new UserController(userService);

        router.get("/", userCcontroller.findAllUsers)
        router.get("/:id", userCcontroller.findOneUser)
        router.post("/", userCcontroller.createUser)
        router.patch("/:id", userCcontroller.updateUser)
        router.delete("/:id", userCcontroller.deleteUser)
        router.post("/login", userCcontroller.loginUser)

        return router;
    }
}
