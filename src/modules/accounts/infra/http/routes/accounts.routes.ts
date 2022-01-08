import { Router } from "express";
import multer from "multer";
import { upload } from "../../../../../config/upload";
import { ensureAuthenticated } from "../../../../users/infra/http/middlewares/ensureAuthenticated";
import { AuthenticateController } from "../controllers/AuthenticateController";
import { CreateAccountController } from "../controllers/CreateAccountController";
import { ShowProfileController } from "../controllers/ShowProfileController";
import { UpdateAvatarController } from "../controllers/UpdateAvatarController";
import { UpdateProfileController } from "../controllers/UpdateProfileController";

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateController = new AuthenticateController();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();
const updateAvatarController = new UpdateAvatarController();
const up = multer(upload.multer);

accountsRouter.post("/", createAccountController.handle);
accountsRouter.post("/authenticate", authenticateController.handle);
accountsRouter.get(
  "/profile",
  ensureAuthenticated,
  showProfileController.handle
);
accountsRouter.put(
  "/profile",
  ensureAuthenticated,
  updateProfileController.handle
);
accountsRouter.patch(
  "/avatar",
  ensureAuthenticated,
  up.single("avatar"),
  updateAvatarController.handle
);

export { accountsRouter };
