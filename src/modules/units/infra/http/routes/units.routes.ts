import { Router } from "express";
import { ensureAuthenticated } from "../../../../../middlewares/ensureAuthenticated";
import { CreateUnityController } from "../controllers/CreateUnityController";
import { ListUnityController } from "../controllers/ListUnityController";

const unitsRouter = Router();

const createUnityController = new CreateUnityController();
const listUnityController = new ListUnityController();

unitsRouter.use(ensureAuthenticated);

unitsRouter.post("/", createUnityController.handle);
unitsRouter.get("/", listUnityController.handle);

export { unitsRouter };
