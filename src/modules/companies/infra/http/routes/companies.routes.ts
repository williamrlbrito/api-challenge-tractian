import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateUnityController } from "../controllers/CreateUnityController";
import { ListCompanyController } from "../controllers/ListCompanyController";
import { ListUnityController } from "../controllers/ListUnityController";

const companiesRouter = Router();

const listCompanyController = new ListCompanyController();
const createCompanyController = new CreateCompanyController();
const listUnityController = new ListUnityController();
const createUnityController = new CreateUnityController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get("/", listCompanyController.handle);
companiesRouter.post("/", createCompanyController.handle);

companiesRouter.get("/:companyId/units", listUnityController.handle);
companiesRouter.post("/:companyId/units", createUnityController.handle);

export { companiesRouter };
