import { Request, Response } from "express";
import { UpdateCompanyUseCase } from "../../../useCases/updateCompany/UpdateCompanyUseCase";

export class UpdateCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;
    const { name } = request.body;

    const updateCompanyUseCase = new UpdateCompanyUseCase();

    const result = await updateCompanyUseCase.execute({
      userId,
      companyId,
      name,
    });

    return response.json(result);
  }
}
