import { Request, Response } from "express";
import { CreateAssetUseCase } from "../../../useCases/createAsset/CreateAssetUseCase";

export class CreateAssetController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId, name, description, model, owner, status, healthLevel } =
      request.body;

    const createAssetUseCase = new CreateAssetUseCase();

    const result = await createAssetUseCase.execute({
      userId,
      unityId,
      name,
      description,
      model,
      owner,
      status,
      healthLevel,
    });

    return response.json(result);
  }
}
