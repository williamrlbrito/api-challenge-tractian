import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { AuthenticateController } from "../controllers/AuthenticateController";
import { CreateAccountController } from "../controllers/CreateAccountController";
import { ShowProfileController } from "../controllers/ShowProfileController";

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateController = new AuthenticateController();
const showProfileController = new ShowProfileController();

accountsRouter.post("/", createAccountController.handle);
accountsRouter.post("/authenticate", authenticateController.handle);
accountsRouter.get(
  "/profile",
  ensureAuthenticated,
  showProfileController.handle
);

export { accountsRouter };
