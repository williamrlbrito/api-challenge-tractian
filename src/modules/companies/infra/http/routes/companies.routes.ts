import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { ListCompanyController } from "../controllers/ListCompanyController";

const companiesRouter = Router();

const listCompanyController = new ListCompanyController();
const createCompanyController = new CreateCompanyController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get("/", listCompanyController.handle);
companiesRouter.post("/", createCompanyController.handle);

export { companiesRouter };
