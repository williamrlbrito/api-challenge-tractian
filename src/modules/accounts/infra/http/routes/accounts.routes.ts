import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { AuthenticateController } from "../controllers/AuthenticateController";
import { CreateAccountController } from "../controllers/CreateAccountController";
import { ShowProfileController } from "../controllers/ShowProfileController";
import { UpdateProfileController } from "../controllers/UpdateProfileController";

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateController = new AuthenticateController();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

accountsRouter.post("/", createAccountController.handle);
accountsRouter.post("/authenticate", authenticateController.handle);
accountsRouter.get(
  "/profile",
  ensureAuthenticated,
  showProfileController.handle
);
accountsRouter.put(
  "/profile",
  ensureAuthenticated,
  updateProfileController.handle
);

export { accountsRouter };
