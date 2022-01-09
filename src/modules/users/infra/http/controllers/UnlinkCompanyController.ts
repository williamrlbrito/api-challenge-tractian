import { Request, Response } from "express";
import { UnlinkCompanyUseCase } from "../../../useCases/unlinkCompany/UnlinkCompanyUseCase";

export class UnlinkCompanyController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;
    const { companyId } = request.body;

    const unlinkCompanyUseCase = new UnlinkCompanyUseCase();

    await unlinkCompanyUseCase.execute({ userId, companyId });

    return response.status(204).send();
  }
}
