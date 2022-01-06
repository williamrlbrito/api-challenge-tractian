import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateController } from "./modules/account/useCases/authenticate/AuthenticateController";
import { CreateAssetController } from "./modules/assets/useCases/createAsset/CreateAssetController";
import { companiesRouter } from "./modules/companies/infra/http/routes/companies.routes";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const createAssetController = new CreateAssetController();

routes.post("/users", createUserController.handle);
routes.post("/users/authenticate", authenticateController.handle);

routes.use("/companies", companiesRouter);

routes.post("/assets", ensureAuthenticated, createAssetController.handle);

export { routes };
