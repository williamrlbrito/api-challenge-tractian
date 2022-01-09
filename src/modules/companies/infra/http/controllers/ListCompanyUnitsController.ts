import { Request, Response } from "express";
import { ListCompanyUnitsUseCase } from "../../../useCases/listCompanyUnits/ListCompanyUnitsUseCase";

export class ListCompanyUnitsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { companyId } = request.params;

    const listCompanyUnitsUseCase = new ListCompanyUnitsUseCase();

    const result = await listCompanyUnitsUseCase.execute({
      userId,
      companyId,
    });

    return response.json(result);
  }
}
