import { Request, Response } from "express";
import { ShowCompanyUseCase } from "../../../useCases/showCompany/ShowCompanyUseCase";

export class ShowCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;

    const showCompanyUseCase = new ShowCompanyUseCase();

    const result = await showCompanyUseCase.execute({
      userId,
      companyId,
    });

    return response.json(result);
  }
}
