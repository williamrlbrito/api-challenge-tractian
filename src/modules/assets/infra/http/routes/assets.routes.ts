import { Router } from "express";
import { ensureAuthenticated } from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import { CreateAssetController } from "../controllers/CreateAssetController";
import { ListAssetController } from "../controllers/ListAssetController";

const assetsRouter = Router();

const createAssetController = new CreateAssetController();
const listAssetController = new ListAssetController();

assetsRouter.use(ensureAuthenticated);

assetsRouter.post("/", createAssetController.handle);
assetsRouter.get("/", listAssetController.handle);

export { assetsRouter };
