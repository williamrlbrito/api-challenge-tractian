import { Router } from "express";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
import { AuthenticateController } from "./modules/account/useCases/authenticate/AuthenticateController";
import { CreateCompanyController } from "./modules/companies/useCases/createCompany/CreateCompanyController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const createCompanyController = new CreateCompanyController();

routes.post("/users", createUserController.handle);
routes.post("/users/authenticate", authenticateController.handle);
routes.post("/companies", ensureAuthenticate, createCompanyController.handle);

export { routes };
