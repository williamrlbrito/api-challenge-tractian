import { Router } from "express";
import { AuthenticateController } from "../controllers/AuthenticateController";
import { CreateAccountController } from "../controllers/CreateAccountController";

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateController = new AuthenticateController();

accountsRouter.post("/", createAccountController.handle);
accountsRouter.post("/authenticate", authenticateController.handle);

export { accountsRouter };
