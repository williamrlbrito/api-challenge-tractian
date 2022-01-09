import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListUsersController } from "../controllers/ListUsersController";
import { LinkCompanyController } from "../controllers/LinkCompanyController";
import { UnlinkCompanyController } from "../controllers/UnlinkCompanyController";

const usersRouter = Router();

const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const linkCompanyController = new LinkCompanyController();
const unlinkCompanyController = new UnlinkCompanyController();

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", listUsersController.handle);
usersRouter.post("/", createUserController.handle);
usersRouter.post("/:userId/linkCompany", linkCompanyController.handle);
usersRouter.post("/:userId/unlinkCompany", unlinkCompanyController.handle);

export { usersRouter };
