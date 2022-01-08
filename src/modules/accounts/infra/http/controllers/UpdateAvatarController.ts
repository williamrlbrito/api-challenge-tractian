import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "../../../useCases/updateAvatar/UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(request: Request, response: Response) {
    const { userId, file } = request;
    const avatarFileName = file.filename;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateAvatarUseCase.execute({
      userId,
      avatarFileName,
    });

    return response.status(204).send();
  }
}
