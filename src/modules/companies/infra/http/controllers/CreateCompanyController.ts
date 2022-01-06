import { Request, Response } from "express";
import { CreateCompanyUseCase } from "../../../useCases/createCompany/CreateCompanyUseCase";

export class CreateCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const { name } = request.body;

    const createCompanyUseCase = new CreateCompanyUseCase();

    const result = await createCompanyUseCase.execute({
      userId,
      name,
    });

    return response.json(result);
  }
}
