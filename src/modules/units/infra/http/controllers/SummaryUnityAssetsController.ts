import { Request, Response } from "express";
import { SummaryUnityAssetsUseCase } from "../../../useCases/summaryUnityAssets/SummaryUnityAssetsUseCase";

export class SummaryUnityAssetsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId } = request.params;

    const summaryUnityAssetsUseCase = new SummaryUnityAssetsUseCase();

    const result = await summaryUnityAssetsUseCase.execute({
      userId,
      unityId,
    });

    return response.json(result);
  }
}
