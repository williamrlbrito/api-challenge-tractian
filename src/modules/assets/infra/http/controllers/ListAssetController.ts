import { Request, Response } from "express";
import { ListAssetUseCase } from "../../../useCases/listAsset/ListAssetUseCase";

export class ListAssetController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listAssetUseCase = new ListAssetUseCase();

    const assets = await listAssetUseCase.execute({ userId });

    return response.json(assets);
  }
}
