import { Request, Response } from "express";
import { LinkCompanyUseCase } from "../../../useCases/linkCompany/LinkCompanyUseCase";

export class LinkCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;
    const { companyId } = request.body;

    const linkCompanyUseCase = new LinkCompanyUseCase();

    await linkCompanyUseCase.execute({ userId, companyId });

    return response.status(201).send();
  }
}
