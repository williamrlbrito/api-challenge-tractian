import { Request, Response } from "express";
import { UpdateProfileUseCase } from "../../../useCases/updateProfile/UpdateProfileUseCase";

export class UpdateProfileController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { name, oldPassword, password } = request.body;

    const updateProfileUseCase = new UpdateProfileUseCase();

    await updateProfileUseCase.execute({
      id: userId,
      name,
      oldPassword,
      password,
    });

    return response.status(204).send();
  }
}
