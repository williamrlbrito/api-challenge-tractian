import { Request, Response } from "express";
import { ListCompanyUseCase } from "../../../useCases/listCompany/ListCompanyUseCase";

export class ListCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const listCompanyUseCase = new ListCompanyUseCase();

    const result = await listCompanyUseCase.execute(userId);

    return response.json(result);
  }
}
