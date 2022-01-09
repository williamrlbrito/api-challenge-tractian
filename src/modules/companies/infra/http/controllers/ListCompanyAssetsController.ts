import { Request, Response } from "express";
import { ListCompanyAssetsUseCase } from "../../../useCases/listCompanyAssets/ListCompanyAssetsUseCase";

export class ListCompanyAssetsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;

    const listCompanyAssetsUseCase = new ListCompanyAssetsUseCase();

    const result = await listCompanyAssetsUseCase.execute({
      userId,
      companyId,
    });

    return response.json(result);
  }
}
