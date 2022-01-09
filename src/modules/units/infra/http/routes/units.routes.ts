import { Router } from "express";
import { ensureAuthenticated } from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import { CreateUnityController } from "../controllers/CreateUnityController";
import { ListUnityAssetsController } from "../controllers/ListUnityAssetsController";
import { ListUnityController } from "../controllers/ListUnityController";
import { ShowUnityController } from "../controllers/ShowUnityController";
import { SummaryUnityAssetsController } from "../controllers/SummaryUnityAssetsController";
import { UpdateUnityController } from "../controllers/UpdateUnityController";

const unitsRouter = Router();

const createUnityController = new CreateUnityController();
const updateUnityController = new UpdateUnityController();
const listUnityAssetsController = new ListUnityAssetsController();
const summaryUnityAssetsController = new SummaryUnityAssetsController();
const showUnityController = new ShowUnityController();
const listUnityController = new ListUnityController();

unitsRouter.use(ensureAuthenticated);

unitsRouter.post("/", createUnityController.handle);
unitsRouter.put("/:unityId", updateUnityController.handle);
unitsRouter.get("/:unityId/assets", listUnityAssetsController.handle);
unitsRouter.get(
  "/:unityId/assets/summary",
  summaryUnityAssetsController.handle
);
unitsRouter.get("/:unityId", showUnityController.handle);
unitsRouter.get("/", listUnityController.handle);

export { unitsRouter };
