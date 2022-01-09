import { Request, Response } from "express";
import { SummaryCompanyAssetsUseCase } from "../../../useCases/summaryCompanyAssets/SummaryCompanyAssetsUseCase";

export class SummaryCompanyAssetsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;

    const summaryCompanyAssetsUseCase = new SummaryCompanyAssetsUseCase();

    const result = await summaryCompanyAssetsUseCase.execute({
      userId,
      companyId,
    });

    return response.json(result);
  }
}
