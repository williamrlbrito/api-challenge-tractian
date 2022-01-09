import { Router } from "express";
import { ensureAuthenticated } from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { ListCompanyAssetsController } from "../controllers/ListCompanyAssetsController";
import { ListCompanyController } from "../controllers/ListCompanyController";
import { ListCompanyUnitsController } from "../controllers/ListCompanyUnitsController";
import { ShowCompanyController } from "../controllers/ShowCompanyController";
import { SummaryCompanyAssetsController } from "../controllers/SummaryCompanyAssetsController";
import { UpdateCompanyController } from "../controllers/UpdateCompanyController";

const companiesRouter = Router();

const listCompanyController = new ListCompanyController();
const createCompanyController = new CreateCompanyController();
const updateCompanyController = new UpdateCompanyController();
const listCompanyUnitsController = new ListCompanyUnitsController();
const listCompanyAssetsController = new ListCompanyAssetsController();
const summaryCompanyAssetsController = new SummaryCompanyAssetsController();
const showCompanyController = new ShowCompanyController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.get("/", listCompanyController.handle);
companiesRouter.post("/", createCompanyController.handle);
companiesRouter.put("/:companyId", updateCompanyController.handle);
companiesRouter.get("/:companyId/units", listCompanyUnitsController.handle);
companiesRouter.get("/:companyId/assets", listCompanyAssetsController.handle);
companiesRouter.get(
  "/:companyId/assets/summary",
  summaryCompanyAssetsController.handle
);
companiesRouter.get("/:companyId", showCompanyController.handle);

export { companiesRouter };
