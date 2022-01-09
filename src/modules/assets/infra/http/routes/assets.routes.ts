import { Router } from "express";
import multer from "multer";
import { upload } from "../../../../../config/upload";
import { ensureAuthenticated } from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import { CreateAssetController } from "../controllers/CreateAssetController";
import { ListAssetController } from "../controllers/ListAssetController";
import { ShowAssetController } from "../controllers/ShowAssetController";
import { UpdateAssetController } from "../controllers/UpdateAssetController";
import { UpdateImageController } from "../controllers/UpdateImageController";

const assetsRouter = Router();

const createAssetController = new CreateAssetController();
const updateAssetController = new UpdateAssetController();
const updateImageController = new UpdateImageController();
const up = multer(upload.multer);
const showAssetController = new ShowAssetController();
const listAssetController = new ListAssetController();

assetsRouter.use(ensureAuthenticated);

assetsRouter.post("/", createAssetController.handle);
assetsRouter.put("/:assetId", updateAssetController.handle);
assetsRouter.patch(
  "/:assetId/image",
  up.single("image"),
  updateImageController.handle
);
assetsRouter.get("/:assetId", showAssetController.handle);
assetsRouter.get("/", listAssetController.handle);

export { assetsRouter };
