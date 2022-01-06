import { Router } from "express";
import { accountsRouter } from "./modules/accounts/infra/http/routes/accounts.routes";
import { assetsRouter } from "./modules/assets/infra/http/routes/assets.routes";
import { companiesRouter } from "./modules/companies/infra/http/routes/companies.routes";
import { unitsRouter } from "./modules/units/infra/http/routes/units.routes";
import { usersRouter } from "./modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/accounts", accountsRouter);
routes.use("/companies", companiesRouter);
routes.use("/units", unitsRouter);
routes.use("/assets", assetsRouter);

export { routes };
