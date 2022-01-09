import { Request, Response } from "express";
import { UpdateUnityUseCase } from "../../../useCases/updateUnity/UpdateUnityUseCase";

export class UpdateUnityController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId } = request.params;
    const { name } = request.body;

    const updateUnityUseCase = new UpdateUnityUseCase();

    const result = await updateUnityUseCase.execute({
      userId,
      unityId,
      name,
    });

    return response.json(result);
  }
}
