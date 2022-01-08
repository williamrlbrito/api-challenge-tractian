import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUserController } from "../controllers/ListUserController";

const usersRouter = Router();

const listUserController = new ListUserController();
const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", listUserController.handle);
usersRouter.post("/", createUserController.handle);

export { usersRouter };
