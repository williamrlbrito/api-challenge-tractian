import { Request, Response } from "express";
import { ShowAssetUseCase } from "../../../useCases/showAsset/ShowAssetUseCase";

export class ShowAssetController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { assetId } = request.params;

    const showAssetUseCase = new ShowAssetUseCase();

    const asset = await showAssetUseCase.execute({ userId, assetId });

    return response.json(asset);
  }
}
