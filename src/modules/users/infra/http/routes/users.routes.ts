import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { CreateUserController } from "../controllers/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.use(ensureAuthenticated);

usersRouter.post("/", createUserController.handle);

export { usersRouter };
