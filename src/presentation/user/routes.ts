import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userService = new UserService();
        const userCcontroller = new UserController(userService);

        router.post("/login", userCcontroller.loginUser)
        router.post("/", userCcontroller.createUser)

        router.use(AuthMiddleware.protect);

        router.get("/", userCcontroller.findAllUsers)
        router.get("/:id", userCcontroller.findOneUser)
        router.patch("/:id", userCcontroller.updateUser)
        router.delete("/:id", userCcontroller.deleteUser)

        return router;
    }
}
