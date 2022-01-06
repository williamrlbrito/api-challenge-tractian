import { Request, Response } from "express";
import { ListAssetUseCase } from "../../../useCases/listAsset/ListAssetUseCase";

export class ListAssetController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { unityId } = request.query;

    const listAssetUseCase = new ListAssetUseCase();

    const result = await listAssetUseCase.execute({
      userId,
      unityId: unityId as string,
    });

    return response.json(result);
  }
}
