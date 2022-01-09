import { Request, Response } from "express";
import { ListUnityAssetsUseCase } from "../../../useCases/listUnityAssets/ListUnityAssetsUseCase";

export class ListUnityAssetsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId } = request.params;

    const listUnityAssetsUseCase = new ListUnityAssetsUseCase();

    const assets = await listUnityAssetsUseCase.execute({
      userId,
      unityId,
    });

    return response.json(assets);
  }
}
