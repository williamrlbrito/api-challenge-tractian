import { Request, Response } from "express";
import { UpdateAssetUseCase } from "../../../useCases/updateAsset/UpdateAssetUseCase";

export class UpdateAssetController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { assetId } = request.params;
    const { name, description, model, owner, status, healthLevel } =
      request.body;

    const updateAssetUseCase = new UpdateAssetUseCase();

    const result = await updateAssetUseCase.execute({
      userId,
      assetId,
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
